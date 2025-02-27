import {PrismaClient} from "@prisma/client";

const prisma = new PrismaClient();

export const createPayment = async (
    customerId: string,
    inventoryItems: { inventoryItemId: string; quantity: number }[],
    totalAmount: number
) => {
    try {
        return await prisma.$transaction(async (tx) => {
            const newPayment = await tx.payment.create({
                data: {
                    id: await generatePaymentID(),
                    amount: totalAmount,
                    status: "PENDING",
                    customerId,
                },
            });

            for (const item of inventoryItems) {
                const {inventoryItemId, quantity} = item;

                const inventoryItem = await tx.inventoryItem.findUnique({
                    where: {id: inventoryItemId},
                });

                if (!inventoryItem || inventoryItem.quantity < quantity) {
                    throw new Error(`Insufficient stock for item: ${inventoryItem?.name}`);
                }

                const newQuantity = inventoryItem.quantity - quantity;

                await tx.inventoryItem.update({
                    where: { id: inventoryItemId },
                    data: {
                        quantity: newQuantity,
                        status: newQuantity === 0 ? "RETURNED" : inventoryItem.status
                    },
                });

                await tx.paymentInventory.create({
                    data: {
                        paymentId: newPayment.id,
                        inventoryItemId,
                    },
                });
            }

            return tx.payment.update({
                where: {id: newPayment.id},
                data: {
                    status: "SUCCESS",
                },
            });
        });
    } catch (error) {
        console.error("Error creating payment:", error);
        throw new Error("Failed to process payment.");
    }
};

export const getAllPayments = async () => {
    try {
        return await prisma.payment.findMany({
            include: {
                customer: true,
                inventoryItems: {
                    include: {
                        inventoryItem: true,
                    },
                },
            },
        });
    } catch (error) {
        console.error("Error fetching all payments:", error);
        throw new Error("Failed to fetch payment details.");
    }
};

async function generatePaymentID() {
    const count = await prisma.payment.count();
    const newId = count + 1;
    return `Payment-${newId.toString().padStart(3, '0')}`;
}