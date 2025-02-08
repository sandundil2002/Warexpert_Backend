import { PrismaClient } from '@prisma/client';
import {StaffModel} from "../model/staff-model";

const prisma = new PrismaClient();

export async function getStaffs() {
    try {
        const staffs = await prisma.staff.findMany();
        console.log(staffs);
        return staffs;
    } catch (error) {
        console.log(error)
    }
}

export async function createStaff(staff: StaffModel) {
    try {
        const createdStaff = await prisma.staff.create({
            data: {
                id: await generateStaffId(),
                name: staff.name,
                role: staff.role,
                shiftSchedule: staff.shiftSchedule,
                gender: staff.gender,
                email: staff.email,
                mobile: staff.mobile,
                warehouseId: staff.warehouseId,
                updatedAt: new Date()
            }
        });
        console.log("Staff Created successfully \n", createdStaff);
        return createdStaff;
    } catch (error) {
        console.log(error)
    }
}

export async function updateStaff(id: string, staff: StaffModel) {
    try {
        const updatedStaff = await prisma.staff.update({
            where: { id },
            data: {
                name: staff.name,
                role: staff.role,
                shiftSchedule: staff.shiftSchedule,
                gender: staff.gender,
                email: staff.email,
                mobile: staff.mobile,
                warehouseId: staff.warehouseId,
            }
        });
        console.log("Staff Updated successfully \n", updatedStaff);
        return updatedStaff;
    }
    catch (error) {
        console.error("Error updating staff:", error);
        throw new Error("Failed to update staff");
    }
}

export async function deleteStaff(id: string) {
    try {
        await prisma.staff.delete({
            where: {
                id: id
            }
        });
        console.log("Staff Deleted successfully");
    } catch (error) {
        console.error("Error deleting staff:", error);
        throw new Error("Failed to delete staff");
    }
}

async function generateStaffId(): Promise<string> {
    const count = await prisma.staff.count();
    const newId = count + 1;
    return `Staff-${newId.toString().padStart(3, '0')}`;
}