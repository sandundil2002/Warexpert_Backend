import nodemailer from 'nodemailer';

export const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
    tls: {
        rejectUnauthorized: false,
    },
});

export function generateOTP() {
    return Math.floor(100000 + Math.random() * 900000).toString();
}

export async function sendOTPEmail(recipientEmail: string) {
    const otp = generateOTP();

    const mailOptions = {
        from: 'nold9343@gmail.com',
        to: recipientEmail,
        subject: 'Warexpert - Verification Code',
        html: `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <title>Warexpert - Verification Code</title>
        <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            title { font-size: 1.5em; font-weight: bold; }
            .logo { color: #007bff; font-weight: bold; } 
            .code { color: #ff4500; font-size: 1.2em; font-weight: bold; } 
        </style>
    </head>
    <body>
        <p style="font-weight: bold">Hello Warexpert User,</p>
        <p>Your verification code for Warexpert is: <span class="code">${otp}</span></p>
        <p>This code will expire in 10 minutes. Please do not share this code with anyone.</p>
        <p>Best regards,<br><span class="logo">Warexpert Team</span></p>
    </body>
    </html>
    `
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log('OTP email sent: ' + info.response);
        return otp;
    } catch (error) {
        console.error('Error sending OTP email:', error);
        throw error;
    }
}

export async function verifyOTP(enteredOTP: string, storedOTP: string | null): Promise<boolean> {
    if (enteredOTP !== storedOTP) {
        console.error("Invalid OTP.");
        return false;
    }

    console.log("OTP verified successfully.");
    return true;
}