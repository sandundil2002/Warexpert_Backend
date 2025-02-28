import express from "express";
import {trackPackage} from "../controller/inventory-controller";

const router = express.Router();
router.use(express.json());

// @ts-ignore
router.get('/get/:trackingId', async (req, res) => {
    try {
        const packageInfo = await trackPackage(req.params.trackingId);
        console.log(packageInfo);
        return res.status(200).json(packageInfo);
    } catch (error) {
        console.log(error);
        return res.status(400).json({ message: "Error Getting Package" });
    }
});


export default router;