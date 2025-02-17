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
        subject: 'Your OTP Code',
        html: `<p>Welcome to Warexpert!</p>
        <p>Your OTP code is: <strong>${otp}</strong>. It is valid for 10 minutes.</p>`
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

// sendOTPEmail('sandundil2002@gmail.com')
//     .then((otp) => {
//         console.log('OTP sent and generated:', otp);
//     })
//     .catch((err) => {
//         console.error('Failed to send OTP:', err);
//     });