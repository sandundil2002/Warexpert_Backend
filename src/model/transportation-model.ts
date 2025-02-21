export class TransportationModel {
    id: string;
    type: string;
    capacity: number;
    numberPlate: string;
    status: string;
    driverId: string;
    createdAt = Date;
    updatedAt = Date;

    constructor(id: string, type: string, capacity: number, numberPlate: string, status: string, driverId: string) {
        this.id = id;
        this.type = type;
        this.capacity = capacity;
        this.numberPlate = numberPlate;
        this.status = status;
        this.driverId = driverId;
    }
}
