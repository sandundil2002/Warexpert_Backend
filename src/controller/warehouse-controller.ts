import { PrismaClient } from '@prisma/client';
import {WarehouseModel} from "../model/warehouse-model";

const prisma = new PrismaClient();

export async function getWarehouses() {
    try {
        const warehouses = await prisma.warehouse.findMany();
        console.log(warehouses);
        return warehouses;
    } catch (error) {
        console.log(error)
    }
}

export async function createWarehouse(warehouse: WarehouseModel) {
    try {
        const createdWarehouse = await prisma.warehouse.create({
            data: {
                id: await generateWarehouseId(),
                name: warehouse.name,
                location: warehouse.location,
                capacity: warehouse.capacity,
                size: warehouse.size,
                image: warehouse.image,
                updatedAt: new Date()
            }
        });
        console.log("Warehouse Created successfully \n", createdWarehouse);
        return createdWarehouse;
    } catch (error) {
        console.log(error)
    }
}

export async function updateWarehouse(id: string, warehouse: WarehouseModel) {
    try {
        const updatedWarehouse = await prisma.warehouse.update({
            where: { id },
            data: {
                name: warehouse.name,
                location: warehouse.location,
                capacity: warehouse.capacity,
                size: warehouse.size,
                image: warehouse.image
            }
        });
        console.log("Warehouse Updated successfully \n", updatedWarehouse);
        return updatedWarehouse;
    } catch (error) {
        console.error("Error updating warehouse:", error);
        throw new Error("Failed to update warehouse");
    }
}

export async function deleteWarehouse(id: string) {
    try {
        await prisma.warehouse.delete({
            where: {
                id: id
            }
        })
        console.log("Warehouse Deleted successfully");
    } catch (error) {
        console.log(error)
    }
}

export async function generateWarehouseId(): Promise<string> {
    const count = await prisma.warehouse.count();
    const newId = count + 1;
    return `Warehouse-${newId.toString().padStart(3, '0')}`;
}