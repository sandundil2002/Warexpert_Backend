import { PrismaClient } from '@prisma/client';
import {TransportationModel} from "../model/transportation-model";

const prisma = new PrismaClient();

export async function getTransportations() {
    try {
        const transportations = await prisma.transportation.findMany();
        console.log(transportations);
        return transportations;
    } catch (error) {
        console.log(error)
    }
}

export async function createTransportation(transportation: TransportationModel) {
    try {
        const createTransportation = await prisma.transportation.create({
            data: {
                id: await generateTransportationId(),
                type: transportation.type,
                capacity: transportation.capacity,
                numberPlate: transportation.numberPlate,
                status: transportation.status,
                driverId: transportation.driverId,
            }
        });
        console.log("Transportation Item Created successfully \n", createTransportation);
        return createTransportation;
    } catch (error) {
        console.log(error)
    }
}

export async function updateTransportation(id: string, transportation: TransportationModel) {
    try {
        const updateTransportation = await prisma.transportation.update({
            where: { id },
            data: {
                type: transportation.type,
                capacity: transportation.capacity,
                numberPlate: transportation.numberPlate,
                status: transportation.status,
                driverId: transportation.driverId,
            }
        });
        console.log("Transportation Item Updated successfully \n", updateTransportation);
        return updateTransportation;
    } catch (error) {
        console.error("Error updating transportation item:", error);
        throw new Error("Failed to update transportation item");
    }
}

export async function deleteTransportation(id: string) {
    try {
        await prisma.transportation.delete({
            where: { id }
        });
        console.log("Transportation Item Deleted successfully \n");
    } catch (error) {
        console.error("Error deleting transportation item:", error);
        throw new Error("Failed to delete transportation item");
    }
}

async function generateTransportationId() {
    const count = await prisma.transportation.count();
    const newId = count + 1;
    return `Transportation-${newId.toString().padStart(3, '0')}`;
}