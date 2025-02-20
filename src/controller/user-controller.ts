import {PrismaClient} from '@prisma/client';
import bcrypt from 'bcrypt';
import {sendOTPEmail} from "./otp-controller";

const prisma = new PrismaClient();
let otpStore: { [key: string]: string } = {};

export async function createUser(user: { username: string; password: string }) {
    const hashedPassword = await bcrypt.hash(user.password, 10);
    const username = user.username;

    try {
        const staffMember = await prisma.staff.findUnique({
            where: {
                email: username,
            },
        });

        if (staffMember) {
            const addedUser = await prisma.user.create({
                data: {
                    username: user.username,
                    password: hashedPassword,
                    role: staffMember.role,
                },
            });

            console.log("User created:", addedUser);
            return true;
        } else {
            return false;
        }

    } catch (error) {
        console.error(error);
        return false;
    }
}

export async function verifyUserCredentials(verifyUser: { username: string; password: string }) {
    try {
        const user = await prisma.user.findUnique({
            where: { username: verifyUser.username },
        });

        if (!user) {
            return false;
        }

        return await bcrypt.compare(verifyUser.password, user.password);
    } catch (error) {
        console.error("Error verifying user credentials:", error);
        return false;
    }
}

export async function validateUser(user: { username: string; password: string }) {
    const username = user.username;

    try {
        const staffMember = await prisma.staff.findUnique({
            where: {
                email: username,
            },
        });

        const existingUser = await prisma.user.findUnique({
            where: {
                username: username,
            },
        });

        if (!staffMember || existingUser) {
            return false;
        } else {
            sendOTPEmail(username).then((otp) => {
                otpStore[username] = otp;
                console.log('OTP sent and generated:', otp);
            }).catch((err) => {
                console.error('Failed to send OTP:', err);
            });
            return true;
        }
    } catch (error) {
        console.error(error);
        return false;
    }
}

export async function getUserRole(userName: string) {
    try {
        const staffMember = await prisma.staff.findUnique({
            where: {
                email: userName,
            },
        });

        if (staffMember) {
            return staffMember.role;
        }
    } catch (error) {
        console.log('Error getting user role:', error);
    }
}

export { otpStore };