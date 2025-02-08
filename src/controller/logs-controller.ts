import { PrismaClient } from '@prisma/client';
import {LogsModel} from "../model/logs-model";

const prisma = new PrismaClient();

export async function getLogs() {
    try {
        const logs = await prisma.operationsLog.findMany();
        console.log(logs);
        return logs;
    } catch (error) {
        console.log(error)
    }
}

export async function createLog(log: LogsModel) {
    try {
        const createLog = await prisma.operationsLog.create({
            data: {
                id: await generateLogId(),
                operationType: log.operationType,
                incidents: log.incidents,
                staffId: log.staffId,
                warehouseId: log.warehouseId,
                inventoryId: log.inventoryId
            }
        });
        console.log("Log Created successfully \n", createLog);
        return createLog;
    } catch (error) {
        console.log(error)
    }
}

export async function updateLog(id: string, log: LogsModel) {
    try {
        const updateLog = await prisma.operationsLog.update({
            where: { id },
            data: {
                operationType: log.operationType,
                incidents: log.incidents,
                staffId: log.staffId,
                warehouseId: log.warehouseId,
                inventoryId: log.inventoryId,
            }
        });
        console.log("Log Updated successfully \n", updateLog);
        return updateLog;
    } catch (error) {
        console.error("Error updating log:", error);
        throw new Error("Failed to update log");
    }
}

export async function deleteLog(id: string) {
    try {
        const deleteLog = await prisma.operationsLog.delete({
            where: { id }
        });
        console.log("Log Deleted successfully \n", deleteLog);
        return deleteLog;
    } catch (error) {
        console.error("Error deleting log:", error);
        throw new Error("Failed to delete log");
    }
}

async function generateLogId() {
    const count = await prisma.operationsLog.count();
    const newId = count + 1;
    return `LOG-${newId.toString().padStart(3, '0')}`;
}