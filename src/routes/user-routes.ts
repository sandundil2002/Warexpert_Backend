import express from "express";
import {getUserDetails} from "../controller/user-controller";

const router = express.Router();
router.use(express.json());

// @ts-ignore
router.get('/get-user', async (req, res) => {
    try {
        const username = req.query.username;
        if (!username) {
            return res.status(400).send("Username is required.");
        }
        const user = await getUserDetails(username as string);
        if (!user) {
            return res.status(404).send("User not found.");
        }
        res.status(200).json(user);
    } catch (error) {
        console.error(error);
        res.status(500).send("Error Getting User");
    }
});

export default router;