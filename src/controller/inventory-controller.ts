import { PrismaClient } from '@prisma/client';
import {InventoryItemModel} from "../model/inventory-model";

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
        const createInventory = await prisma.inventoryItem.create({
            data: {
                id: await generateInventoryId(),
                name: inventory.name,
                category: inventory.category,
                quantity: inventory.quantity,
                status: inventory.status,
                warehouseId: inventory.warehouseId,
                customerId: inventory.customerId,
                image: inventory.image,
                expiry: String(inventory.expiry)
            }
        });
        console.log("Inventory Item Created successfully \n", createInventory);
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

async function generateInventoryId(): Promise<string> {
    const count = await prisma.inventoryItem.count();
    const newId = count + 1;
    return `Inventory-${newId.toString().padStart(3, '0')}`;
}