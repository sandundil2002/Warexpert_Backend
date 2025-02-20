import {UserRole} from "./enums";

export interface UserModel {
    id: number;
    username: string;
    password: string;
    role: UserRole;
}