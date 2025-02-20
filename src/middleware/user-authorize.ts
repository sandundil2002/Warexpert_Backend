import { Request, Response, NextFunction } from 'express';
import jwt from "jsonwebtoken";

interface UserPayload {
    username: string;
    role: string;
}

declare global {
    namespace Express {
        interface Request {
            user?: UserPayload;
        }
    }
}

function authorizeRole(requiredRole: string) {
    return (req: Request, res: Response, next: NextFunction): void => {
        try {
            const authHeader = req.headers.authorization;
            if (!authHeader || !authHeader.startsWith('Bearer ')) {
                console.log('Missing or invalid Authorization header');
                res.status(401).json({ error: 'Missing or invalid Authorization header' });
                return;
            }

            const token = authHeader.split(' ')[1];

            const secretKey = process.env.SECRET_KEY;
            if (!secretKey) {
                throw new Error('Secret key is not defined');
            }

            const decoded = jwt.verify(token, secretKey) as UserPayload;

            req.user = decoded;

            const userRole = decoded.role;
            console.log(`User role: ${userRole}, Required role: ${requiredRole}`);
            if (!userRole || userRole !== requiredRole) {
                console.log(`User role: ${userRole}, Required role: ${requiredRole}`);
                res.status(403).json({ error: "You do not have permission to access this resource." });
                return;
            }

            next();
        } catch (error) {
            console.error('Error during authorization:', error);
            res.status(403).json({ error: 'Invalid or expired token.' });
            return;
        }
    };
}

export default authorizeRole;