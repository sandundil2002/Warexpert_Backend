import express from "express";
import {sendContactMessage} from "../controller/contact-controller";
import {ContactModel} from "../model/contact-model";

const router = express.Router();
router.use(express.json());

// @ts-ignore
router.post('/post', async (req, res) => {
    try {
        const { name, email, message } = req.body as ContactModel;

        if (!name || !email || !message) {
            return res.status(400).json({ error: "All fields (name, email, message) are required" });
        }

        console.log(`📩 Sending contact message from ${name} (${email})`);

        const contact: ContactModel = { name, email, message };
        await sendContactMessage(contact);

        return res.status(200).json({ message: "Contact message sent successfully" });
    } catch (error) {
        console.error("❌ Error:", error);
        return res.status(500).json({
            message: "Error sending contact message",
            error: error instanceof Error ? error.message : "Unknown error"
        });
    }
});

export default router;