import express from "express";
import {createPayment} from "../controller/payment-controller";
const stripe = require('stripe')('sk_test_51QxXzS2NXG3ju9wR2BSqlX8ZuSbRXHfsj4OHBmXqFd7QUVMR155WuqcPVwcxixSRR1OtSA2CKrCPrS30AkTqChUx00v2uNkfJU');

const router = express.Router();
router.use(express.json());

//@ts-ignore
router.post("/create-payment", async (req, res) => {
    try {
        const {customerId, inventoryItems, totalAmount } = req.body;

        if (!Array.isArray(inventoryItems) || inventoryItems.length === 0 || !totalAmount) {
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

export default router;