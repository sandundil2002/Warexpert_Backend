import express from "express";
import {createWarehouse, deleteWarehouse, getWarehouses, updateWarehouse} from "../controller/warehouse-controller";
import {WarehouseModel} from "../model/warehouse-model";
import multer from "multer";
import authorizeRole from "../middleware/user-authorize";

const router = express.Router();
router.use(express.json());

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.get('/get', async (req, res) => {
    try {
        const warehouses = await getWarehouses()
        res.status(200).json(warehouses);
    } catch (error) {
        console.log(error);
        res.status(400).send("Error Getting Warehouse")
    }
});

router.post('/post', authorizeRole("MANAGER"), upload.single('image'), async (req, res) => {
    try {
        const { name, location, capacity, size, image } = req.body;

        const warehouseModel = new WarehouseModel(
            "",
            name,
            location,
            Number(capacity),
            Number(size),
            image
        );

        const addedWarehouse = await createWarehouse(warehouseModel);
        if (addedWarehouse) {
            res.status(201).json(addedWarehouse);
        }
    } catch (error) {
        console.log(error);
        res.status(400).send("Failed Create Customer")
    }
});

// @ts-ignore
router.patch('/patch/:id', authorizeRole("MANAGER"), upload.single('image'), async (req, res) => {
    try {
        const { id } = req.params;
        const { name, location, capacity, size, image } = req.body;

        if (!id) {
            return res.status(400).json({ message: "Warehouse ID is required" });
        }

        const warehouseData = new WarehouseModel(
            id,
            name,
            location,
            Number(capacity),
            Number(size),
            image
        );

        const updatedWarehouse = await updateWarehouse(id, warehouseData);
        res.status(200).json(updatedWarehouse);
    } catch (error) {
        console.error("Update failed:", error);
        res.status(500).json({ message: "Failed to update warehouse" });
    }
});

// @ts-ignore
router.delete('/delete/:id', authorizeRole("MANAGER"), async(req, res) => {
    const warehouseId: string = req.params.id;

    try {
        if (!warehouseId) {
            return res.status(400).json({ message: "Warehouse ID is required" });
        }
        await deleteWarehouse(warehouseId);
        res.status(204).json("Warehouse Delete Successful");
    } catch (error) {
        console.log(error);
    }
})

export default router;