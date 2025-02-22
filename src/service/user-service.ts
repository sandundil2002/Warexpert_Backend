import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getUserAccount = async (userId: string) => {
    try {
        const user = await prisma.user.findUnique({
            where: { id: parseInt(userId) },
        });

        if (user) {
            const staff = await prisma.staff.findUnique({
                where: { email: user.username },
            });

            return {
                id: user.id,
                username: user.username,
                email: staff?.email || "",
                name: staff?.name || "",
                mobile: staff?.mobile || "",
            };
        }

    } catch (error) {
        console.error("Error fetching user account:", error);
        throw new Error("Failed to fetch user account.");
    }
};

export const updateUserAccount = async (userId: string, data: { username?: string; email?: string; name?: string; mobile?: string }) => {
    try {
        // Update the user's username
        const updatedUser = await prisma.user.update({
            where: { id: parseInt(userId) },
            data: { username: data.username },
        });

        // Update the corresponding staff details
        await prisma.staff.update({
            where: { email: updatedUser.username },
            data: {
                email: data.email,
                name: data.name,
                mobile: data.mobile,
            },
        });

        return {
            id: updatedUser.id,
            username: updatedUser.username,
            email: data.email || "",
            name: data.name || "",
            mobile: data.mobile || "",
        };
    } catch (error) {
        console.error("Error updating user account:", error);
        throw new Error("Failed to update user account.");
    }
};