import { transporter } from "./otp-controller";
import { ContactModel } from "../model/contact-model";

export async function sendContactMessage(contact: ContactModel) {
    try {
        const mailOptions = {
            from: 'nold9343@gmail.com',
            to: 'sandundil2002@gmail.com',
            subject: `WareXpert Contact Message from ${contact.name}`,
            html: `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <title>WareXpert - Contact Message</title>
        <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .header { font-size: 1.5em; font-weight: bold; color: #007bff; }
            .sender { font-weight: bold; color: #ff4500; }
            .message-box { border: 1px solid #ddd; padding: 10px; border-radius: 5px; background: #f9f9f9; }
        </style>
    </head>
    <body>
        <p class="header">New Contact Message from WareXpert</p>
        <p><span class="sender">Name:</span> ${contact.name}</p>
        <p><span class="sender">Email:</span> ${contact.email}</p>
        <p><span class="sender">Message:</span></p>
        <p class="message-box">${contact.message}</p>
        <br>
        <p>Best regards,<br><strong>WareXpert Team</strong></p>
    </body>
    </html>
    `
        };

        const info = await transporter.sendMail(mailOptions);
        console.log('Contact message email sent:', info.response);
        return { success: true, message: "Email sent successfully" };
    } catch (error) {
        console.error('❌ Error sending contact message:', error);
        throw new Error("Failed to send contact message");
    }
}