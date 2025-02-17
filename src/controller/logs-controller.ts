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
                type: log.type,
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

async function generateLogId() {
    const count = await prisma.operationsLog.count();
    const newId = count + 1;
    return `LOG-${newId.toString().padStart(3, '0')}`;
}