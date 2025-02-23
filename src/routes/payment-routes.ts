import express from "express";
import {createPayment, getAllPayments} from "../controller/payment-controller";

const router = express.Router();
router.use(express.json());

// @ts-ignore
router.post('/post', async (req, res) => {
    try {
        const { customerId, inventoryItems, totalAmount } = req.body;

        if (!customerId || !Array.isArray(inventoryItems) || inventoryItems.length === 0 || !totalAmount) {
            return res.status(400).json({ message: "Invalid request data." });
        }

        const payment = await createPayment(customerId, inventoryItems, totalAmount);
        console.log(payment);
        res.status(200).json(payment);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error processing payment." });
    }
});

router.get('/get', async (req, res) => {
    try {
        const payments = await getAllPayments();
        res.status(200).json(payments);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error fetching payment details." });
    }
});

export default router;