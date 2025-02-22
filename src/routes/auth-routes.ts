import dotenv from "dotenv";
import express from "express";
import {createUser, getUserRole, otpStore, validateUser, verifyUserCredentials} from "../controller/user-controller";
import jwt, {Secret} from 'jsonwebtoken';
import {verifyOTP} from "../controller/otp-controller";

dotenv.config();
const router = express.Router();

// @ts-ignore
router.post("/signin", async (req, res) => {
    console.log('Signin')
    const username = req.body.user?.username;
    const password = req.body.user?.password;

    if (!username || !password) {
        return res.status(400).json({ error: "Username and password are required." });
    }

    try{
        const user = {username, password};
        const isVerified =  await verifyUserCredentials(user);

        if(isVerified){
            const role = await getUserRole(username);
            const token = jwt.sign({ role }, process.env.SECRET_KEY as Secret, {expiresIn: "15m"});
            const refreshToken = jwt.sign({ username }, process.env.REFRESH_TOKEN as Secret, {expiresIn: "1d"});
            res.status(200).json({accessToken : token, refreshToken : refreshToken});
        }else{
            return res.status(401).json({ error: "Invalid username or password." });
        }
    }catch(err){
        console.error("Error during signin:", err);
        return res.status(500).json({ error: "An unexpected error occurred." });
    }
});

router.post("/signup", async (req, res) => {
    console.log('Signup', req.body);
    const username = req.body.user.username;
    const password = req.body.user.password;

    const user = {username, password};

    try{
        const validated = await validateUser(user);

        if (validated) {
            res.status(200).json({ success: true, message: 'OTP sent to email' });
        } else {
            res.status(400).json({ success: false, message: 'User already exists' });
        }
    }catch(err){
        console.log(err);
        res.status(401).json(err);
    }
});

router.post("/verify-otp", async (req, res) => {
    const username = req.body.user.username;
    const password = req.body.user.password;
    const enteredOTP: string = req.body.otp;
    const storedOTP = otpStore[username];

    const valid = await verifyOTP(enteredOTP, storedOTP);

    if (valid) {
        const created = await createUser({username, password});

        if (created) {
            const role = await getUserRole(username);
            const token = jwt.sign({ role }, process.env.SECRET_KEY as Secret, {expiresIn: "15m"});
            const refreshToken = jwt.sign({ username }, process.env.REFRESH_TOKEN as Secret, {expiresIn: "1d"});
            res.status(201).json({success: true, accessToken : token, refreshToken : refreshToken});
            delete otpStore[username];
        }
    } else {
        res.status(400).send('Invalid OTP');
    }
});

// @ts-ignore
router.post("/refresh-token", async (req, res) => {
    const { refreshToken } = req.body;

    if (!refreshToken) {
        return res.status(401).json({ message: "No refresh token provided" });
    }

    try {
        // Verify the refresh token
        const payload = jwt.verify(refreshToken, process.env.REFRESH_TOKEN as string) as { username: string, iat: number };

        const accessToken = jwt.sign(
            { username: payload.username },
            process.env.SECRET_KEY as string,
            { expiresIn: "15m" }
        );

        const newRefreshToken = jwt.sign(
            { username: payload.username },
            process.env.REFRESH_TOKEN as string,
            { expiresIn: "1d" }
        );

        res.json({
            accessToken,
            refreshToken: newRefreshToken,
        });
    } catch (err) {
        console.error("Token verification failed:", err);
    }
});

export function authenticateToken(req : express.Request, res : express.Response, next : express.NextFunction){
    const authHeader = req.headers.authorization;
    const token = authHeader?.split(' ')[1];

    if(!token)res.status(401).send('No token provided');

    try{
        const payload = jwt.verify(token as string, process.env.SECRET_KEY as Secret) as {username: string, iat: number};
        console.log(payload.username);
        req.body.username = payload.username;
        next();
    }catch(err){
        res.status(401).send(err);
    }
}

export default router;