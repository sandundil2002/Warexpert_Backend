export class WarehouseModel {
    id: string;
    name: string;
    location: string;
    capacity: number;
    size: number;
    image?: string;
    createdAt: Date;
    updatedAt: Date;

    constructor(id: string, name: string, location: string, capacity: number, size: number, image?: string) {

        if (!name || !location || capacity <= 0 || size <= 0) {
            throw new Error("Invalid warehouse data");
        }

        this.id = id;
        this.name = name;
        this.location = location;
        this.capacity = capacity;
        this.size = size;
        this.image = image;
        this.createdAt = new Date();
        this.updatedAt = new Date();
    }
}