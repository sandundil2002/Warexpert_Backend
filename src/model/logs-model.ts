export class LogsModel {
    id: string;
    operationType: string;
    incidents?: string;
    staffId: string;
    warehouseId: string;
    inventoryId: string;
    createdAt: Date;
    updatedAt: Date;

    constructor(id: string, operationType: string, staffId: string, warehouseId: string, inventoryId: string, incidents?: string) {
        this.id = id;
        this.operationType = operationType;
        this.incidents = incidents;
        this.staffId = staffId;
        this.warehouseId = warehouseId;
        this.inventoryId = inventoryId;
        this.createdAt = new Date();
        this.updatedAt = new Date();
    }
}
