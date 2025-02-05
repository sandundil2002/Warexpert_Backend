export class InventoryItemModel {
    id: string;
    name: string;
    category: string;
    quantity: number;
    status: string;
    image?: string;
    warehouseId: string;
    customerId: string;
    createdAt: Date;
    updatedAt: Date;

    constructor(id: string, name: string, category: string, quantity: number, status: string, warehouseId: string, customerId: string, image?: string) {
        this.id = id;
        this.name = name;
        this.category = category;
        this.quantity = quantity;
        this.status = status;
        this.warehouseId = warehouseId;
        this.customerId = customerId;
        this.image = image;
        this.createdAt = new Date();
        this.updatedAt = new Date();
    }
}
