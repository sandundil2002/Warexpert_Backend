import express from "express";
import {createEquipment, deleteEquipment, getEquipment, updateEquipment} from "../controller/equipment-controller";
import {EquipmentModel} from "../model/equipment-model";
import authorizeRole from "../middleware/user-authorize";

const router = express.Router();
router.use(express.json());

router.get('/get', async (req, res) => {
    try {
        const equipment = await getEquipment();
        res.status(200).json(equipment);
    } catch (error) {
        console.log(error);
        res.status(400).send("Error Getting Equipment")
    }
});

router.post('/post', authorizeRole("MANAGER", "SUPERVISOR"), async (req, res) => {
    try {
        const { type, category, status, staffId, warehouseId } = req.body;

        const equipment = new EquipmentModel(
            "",
            type,
            category,
            status,
            staffId,
            warehouseId
        );

        const addedEquipment = await createEquipment(equipment);
        if (addedEquipment) {
            res.status(201).json(addedEquipment);
        }
    } catch (error) {
        console.log(error);
        res.status(400).send("Failed Create Equipment")
    }
});

// @ts-ignore
router.patch('/patch/:id', authorizeRole("MANAGER", "SUPERVISOR"), async (req, res) => {
    try {
        const equipmentId = req.params.id;
        const { type, category, status, staffId, warehouseId } = req.body;

        if (!equipmentId) {
            return res.status(400).json({ message: "Equipment ID is required" });
        }

        const equipment = new EquipmentModel(
            equipmentId,
            type,
            category,
            status,
            staffId,
            warehouseId,
        );

        const updatedEquipment = await updateEquipment(equipmentId, equipment);
        if (updatedEquipment) {
            res.status(200).json(updatedEquipment);
        }
    } catch (error) {
        console.log(error);
        res.status(400).send("Failed Update Equipment")
    }
});

// @ts-ignore
router.delete('/delete/:id', authorizeRole("MANAGER", "SUPERVISOR"), async (req, res) => {
    try {
        const equipmentId = req.params.id;

        if (!equipmentId) {
            return res.status(400).json({ message: "Equipment ID is required" });
        }

        await deleteEquipment(equipmentId);
        res.status(200).json({ message: "Equipment Deleted Successfully" });
    } catch (error) {
        console.log(error);
        res.status(400).send("Failed Delete Equipment")
    }
});

export default router;