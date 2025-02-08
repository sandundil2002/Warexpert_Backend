import { PrismaClient } from '@prisma/client';
import {EquipmentModel} from "../model/equipment-model";

const prisma = new PrismaClient();

export async function getEquipment() {
    try {
        const equipment = await prisma.equipment.findMany();
        console.log(equipment);
        return equipment;
    } catch (error) {
        console.log(error)
    }
}

export async function createEquipment(equipment:EquipmentModel) {
    try {
        const createEquipment = await prisma.equipment.create({
            data: {
                id: await generateEquipmentId(),
                type: equipment.type,
                category: equipment.category,
                status: equipment.status,
                warehouseId: equipment.warehouseId,
                staffId: equipment.staffId,
            }
        });
        console.log("Equipment Created successfully \n", createEquipment);
        return createEquipment;
    } catch (error) {
        console.log(error)
    }
}

export async function updateEquipment(id: string, equipment: EquipmentModel) {
    try {
        const updateEquipment = await prisma.equipment.update({
            where: { id },
            data: {
                type: equipment.type,
                category: equipment.category,
                status: equipment.status,
                warehouseId: equipment.warehouseId,
                staffId: equipment.staffId,
            }
        });
        console.log("Equipment Updated successfully \n", updateEquipment);
        return updateEquipment;
    } catch (error) {
        console.error("Error updating equipment:", error);
        throw new Error("Failed to update equipment");
    }
}

export async function deleteEquipment(id: string) {
    try {
        const deleteEquipment = await prisma.equipment.delete({
            where: { id }
        });
        console.log("Equipment Deleted successfully \n", deleteEquipment);
        return deleteEquipment;
    } catch (error) {
        console.error("Error deleting equipment:", error);
        throw new Error("Failed to delete equipment");
    }
}

async function generateEquipmentId(): Promise<string> {
    const count = await prisma.equipment.count();
    const newId = count + 1;
    return `Equipment-${newId.toString().padStart(3, '0')}`;
}
