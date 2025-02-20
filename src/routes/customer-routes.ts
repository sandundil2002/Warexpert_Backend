import express from "express";
import {createCustomer, deleteCustomer, getCustomers, updateCustomer} from "../controller/customer-controller";
import {CustomerModel} from "../model/customer-model";
import authorizeRole from "../middleware/user-authorize";

const router = express.Router();
router.use(express.json());

router.get('/get', authorizeRole("MANAGER"), async (req, res) => {
    try {
        const customers = await getCustomers();
        res.status(200).json(customers);
    } catch (error) {
        console.log(error);
        res.status(400).send("Error Getting Customers")
    }
});

router.post('/post', async (req, res) => {
    try {
        const { name, address, email, mobile } = req.body;

        const customerModel = new CustomerModel(
            "",
            name,
            address,
            email,
            mobile
        );

        const addedCustomer = await createCustomer(customerModel);
        if (addedCustomer) {
            res.status(201).json(addedCustomer);
        }
    } catch (error) {
        console.log(error);
        res.status(400).send("Failed Create Customer")
    }
});

// @ts-ignore
router.patch('/patch/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { name, address, email, mobile } = req.body;

        if (!id) {
            return res.status(400).json({ message: "Customer ID is required" });
        }

        const customerModel = new CustomerModel(
            id,
            name,
            address,
            email,
            mobile
        );

        const updatedCustomer = await updateCustomer(id, customerModel);
        res.status(200).json(updatedCustomer);
    } catch (error) {
        console.log("Error updating customer:", error);
        res.status(400).send("Failed to update customer")
    }
});

// @ts-ignore
router.delete('/delete/:id', async (req, res) => {
    const customerId: string = req.params.id;

    try {
        if (!customerId) {
            return res.status(400).json({ message: "Customer ID is required" });
        }

        await deleteCustomer(customerId);
        res.status(204).send("Customer Deleted successfully");
    } catch (error) {
        console.log(error);
        res.status(400).send("Error Deleting Customer")
    }
});

export default router;