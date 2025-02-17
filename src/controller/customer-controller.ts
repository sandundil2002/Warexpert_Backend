import {PrismaClient} from '@prisma/client';
import {CustomerModel} from "../model/customer-model";

const prisma = new PrismaClient();

export async function getCustomers() {
    try {
        const customers = await prisma.customer.findMany();
        console.log(customers);
        return customers;
    } catch (error) {
        console.log(error);
    }
}

export async function createCustomer(customer: CustomerModel) {
    try {
        const createdCustomer = await prisma.customer.create({
            data: {
                id: await generateCustomerId(),
                name: customer.name,
                email: customer.email,
                mobile: customer.mobile,
                address: customer.address
            }
        });
        console.log("Customer Created successfully \n", createdCustomer);
        return createdCustomer;
    } catch (error) {
        console.log(error);
    }
}

export async function updateCustomer(id: string, customer: CustomerModel) {
    try {
        const updatedCustomer = await prisma.customer.update({
            where: {id},
            data: {
                name: customer.name,
                email: customer.email,
                mobile: customer.mobile,
                address: customer.address
            }
        });
        console.log("Customer Updated successfully \n", updatedCustomer);
        return updatedCustomer;
    } catch (error) {
        console.error("Error updating customer:", error);
        throw new Error("Failed to update customer");
    }
}

export async function deleteCustomer(id: string) {
    try {
        await prisma.customer.delete({
            where: {
                id: id
            }
        });
        console.log("Customer Deleted successfully");
    } catch (error) {
        console.error("Error deleting customer:", error);
        throw new Error("Failed to delete customer");
    }
}

async function generateCustomerId() {
    const count = await prisma.customer.count();
    const newId = count + 1;
    return `Customer-${newId.toString().padStart(3, '0')}`;
}