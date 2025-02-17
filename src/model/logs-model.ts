export class LogsModel {
    id: string;
    type: string;
    incidents?: string;
    staffId: string;
    warehouseId: string;
    inventoryId: string;
    createdAt: Date;
    updatedAt: Date;

    constructor(id: string, type: string, staffId: string, warehouseId: string, inventoryId: string, incidents?: string) {
        this.id = id;
        this.type = type;
        this.incidents = incidents;
        this.staffId = staffId;
        this.warehouseId = warehouseId;
        this.inventoryId = inventoryId;
        this.createdAt = new Date();
        this.updatedAt = new Date();
    }
}
