export class CustomerModel {
    id: string;
    name: string;
    address: string;
    email: string;
    mobile: string;
    createdAt: Date;
    updatedAt: Date;

    constructor(id: string, name: string, address: string, email: string, mobile: string) {
        this.id = id;
        this.name = name;
        this.address = address;
        this.email = email;
        this.mobile = mobile;
        this.createdAt = new Date();
        this.updatedAt = new Date();
    }
}
