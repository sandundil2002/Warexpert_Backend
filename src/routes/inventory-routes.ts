import express from "express";
import {
    createInventoryItem,
    deleteInventoryItem,
    getInventories,
    updateInventoryItem
} from "../controller/inventory-controller";
import multer from "multer";
import {InventoryItemModel} from "../model/inventory-model";
import authorizeRole from "../middleware/user-authorize";

const router = express.Router();
router.use(express.json());

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.get('/get', async (req, res) => {
    try {
        const inventories = await getInventories()
        res.status(200).json(inventories);
    } catch (error) {
        console.log(error);
        res.status(400).send("Error Getting Inventories")
    }
});

router.post('/post', authorizeRole("MANAGER", "SUPERVISOR"), upload.single('image') , async (req, res) => {
    try {
        const { name, category, quantity, warehouseId, customerId, image, expiry } = req.body;
        const status = "Available";

        const inventory = new InventoryItemModel(
            "",
            name,
            category,
            Number(quantity),
            status,
            warehouseId,
            customerId,
            image,
            expiry
        );

        const addedInventory = await createInventoryItem(inventory);
        if (addedInventory) {
            res.status(201).json(addedInventory);
        }
    } catch (error) {
        console.log(error);
        res.status(400).send("Failed Create Inventory Item")
    }
});

// @ts-ignore
router.patch('/patch/:id', authorizeRole("MANAGER", "SUPERVISOR"), upload.single('image'), async (req, res) => {
    try {
        const inventoryId = req.params.id;
        const { name, category, quantity, status, warehouseId, customerId, image, expiry } = req.body;

        if (!inventoryId) {
            return res.status(400).json({ message: "Inventory ID is required" });
        }

        const inventory = new InventoryItemModel(
            inventoryId,
            name,
            category,
            Number(quantity),
            status,
            warehouseId,
            customerId,
            image,
            expiry
        );

        const updatedInventory = await updateInventoryItem(inventoryId, inventory);
        res.status(200).json(updatedInventory);
    } catch (error) {
        console.log(error);
        res.status(400).send("Failed Update Inventory Item")
    }
});

// @ts-ignore
router.delete('/delete/:id', authorizeRole("MANAGER", "SUPERVISOR"), async (req, res) => {
    const { id } = req.params;

    try {
        if (!id) {
            return res.status(400).json({ message: "Inventory ID is required" });
        }
        await deleteInventoryItem(id);
        res.status(200).send("Inventory Item Deleted");
    } catch (error) {
        console.log(error);
        res.status(400).send("Failed Delete Inventory Item")
    }
});

export default router;