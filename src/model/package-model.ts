export interface PackageModel {
    id: string;
    name: string;
    category: string;
    quantity: number;
    status: string;
    warehouseName: string;
    location: string;
    customerId: string;
    customerName: string;
    customerAddress: string;
    image: string;
    expiry: string;
    trackingNumber: string;
    createdAt: Date;
    updatedAt: Date;
}