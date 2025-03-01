import {PrismaClient} from '@prisma/client';
import {InventoryItemModel} from "../model/inventory-model";
import {transporter} from "./otp-controller";
import {PackageModel} from "../model/package-model";

const prisma = new PrismaClient();

export async function getInventories() {
    try {
        const inventories = await prisma.inventoryItem.findMany();
        console.log(inventories);
        return inventories;
    } catch (error) {
        console.log(error)
    }
}

export async function createInventoryItem(inventory: InventoryItemModel) {
    try {
        const trackingId = generateTrackingNumber();
        const [createInventory] = await Promise.all([prisma.inventoryItem.create({
            data: {
                id: await generateInventoryId(),
                name: inventory.name,
                category: inventory.category,
                quantity: inventory.quantity,
                status: inventory.status,
                warehouseId: inventory.warehouseId,
                customerId: inventory.customerId,
                image: inventory.image,
                expiry: String(inventory.expiry),
                // @ts-ignore
                trackingNumber: trackingId
            }
        })]);
        console.log("Inventory Item Created successfully \n", createInventory);
        await findCustomerEmail(inventory.customerId, trackingId);
        return createInventory;
    } catch (error) {
        console.log(error)
    }
}

export async function updateInventoryItem(id: string, inventory: InventoryItemModel) {
    try {
        const updateInventory = await prisma.inventoryItem.update({
            where: { id },
            data: {
                name: inventory.name,
                category: inventory.category,
                quantity: inventory.quantity,
                status: inventory.status,
                warehouseId: inventory.warehouseId,
                customerId: inventory.customerId,
                image: inventory.image,
                expiry: inventory.expiry
            }
        });
        console.log("Inventory Item Updated successfully \n", updateInventory);
        return updateInventory;
    } catch (error) {
        console.error("Error updating inventory item:", error);
        throw new Error("Failed to update inventory item");
    }
}

export async function deleteInventoryItem(id: string) {
    try {
        await prisma.inventoryItem.delete({
            where: {
                id: id
            }
        });
        console.log("Inventory Item Deleted successfully");
    } catch(error) {
        console.error("Error deleting inventory item:", error);
        throw new Error("Failed to delete inventory item");
    }
}

export async function trackPackage(trackingId: string): Promise<PackageModel | null> {
    try {
        const inventory = await prisma.inventoryItem.findFirst({
            where: { trackingNumber: trackingId },
        });

        if (!inventory) {
            throw new Error("Package not found.");
        }

        const warehouse = await prisma.warehouse.findUnique({
            where: { id: inventory.warehouseId },
        });

        const customer = await prisma.customer.findUnique({
            // @ts-ignore
            where: { id: inventory.customerId },
        });

        return {
            id: inventory.id,
            name: inventory.name,
            category: inventory.category,
            quantity: inventory.quantity,
            status: inventory.status,
            warehouseName: warehouse?.name || "Unknown Warehouse",
            location: warehouse?.location || "Unknown Location",
            customerId: String(inventory.customerId),
            customerName: customer?.name || "Unknown Customer",
            customerAddress: customer?.address || "Unknown Address",
            image: inventory.image || "",
            expiry: inventory.expiry || "No Expiry",
            trackingNumber: String(inventory.trackingNumber),
            createdAt: inventory.createdAt,
            updatedAt: inventory.updatedAt,
        };
    } catch (error) {
        console.error("Error tracking package:", error);
        return null;
    }
}

async function findCustomerEmail(customerId: string, trackingNumber: string) {
    try {
        const customer = await prisma.customer.findUnique({
            where: { id: customerId }
        });

        if (customer) {
            await sendTrackingNumberEmail(customer.email, trackingNumber);
        } else {
            console.error('Customer not found:', customerId);
        }
    } catch (e) {
        console.log('Error finding customer email:', e);
    }
}

async function sendTrackingNumberEmail(recipientEmail: string, trackingNumber: string) {
    const mailOptions = {
        from: 'nold9343@gmail.com',
        to: recipientEmail,
        subject: 'Warexpert - Your Package Tracking Number',
        html: `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <title>Warexpert - Package Tracking Number</title>
        <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .logo { color: #007bff; font-weight: bold; } 
            .tracking-number { color: #ff4500; font-size: 1.2em; font-weight: bold; } 
        </style>
    </head>
    <body>
        <p style="font-weight: bold">Hello Warexpert Customer,</p>
        <p>Your tracking number for your recent package is: <span class="tracking-number">${trackingNumber}</span></p>
        <p>You can use this tracking number to monitor the status of your package on our mobile application.</p>
        <p>This tracking number will remain valid until the delivery is completed.</p>
        <p>Best regards,<br><span class="logo">Warexpert Team</span></p>
    </body>
    </html>
    `
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log('Tracking number email sent: ' + info.response);
        return trackingNumber;
    } catch (error) {
        console.error('Error sending tracking number email:', error);
        throw error;
    }
}

async function generateInventoryId(): Promise<string> {
    const count = await prisma.inventoryItem.count();
    const newId = count + 1;
    return `Inventory-${newId.toString().padStart(3, '0')}`;
}

const generateTrackingNumber = () => {
    return `TRK-${Math.floor(100000 + Math.random() * 900000)}`;
};