import {Gender, UserRole} from "./enums";

export class StaffModel {
    id: string;
    name: string;
    role: UserRole;
    shiftSchedule: string;
    gender: Gender;
    email: string;
    mobile: string;
    warehouseId: string;
    createdAt: Date;
    updatedAt: Date;

    constructor(id: string, name: string, role: UserRole, shiftSchedule: string, gender: Gender, email: string, mobile: string, warehouseId: string) {

        if (!name || !role || !shiftSchedule || !gender || !email || !mobile || !warehouseId) {
            throw new Error("Invalid staff data");
        }

        this.id = id;
        this.name = name;
        this.role = role;
        this.shiftSchedule = shiftSchedule;
        this.gender = gender;
        this.email = email;
        this.mobile = mobile;
        this.warehouseId = warehouseId;
        this.createdAt = new Date();
        this.updatedAt = new Date();
    }
}
