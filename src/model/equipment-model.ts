export class EquipmentModel {
    id: string;
    type: string;
    category: string;
    status: string;
    staffId: string;
    warehouseId: string;
    createdAt = Date;
    updatedAt = Date;

    constructor(id: string, type: string, category: string, status: string, staffId: string, warehouseId: string) {
        this.id = id;
        this.type = type;
        this.category = category;
        this.status = status;
        this.staffId = staffId;
        this.warehouseId = warehouseId;
    }
}
