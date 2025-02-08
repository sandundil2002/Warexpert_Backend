import express from "express";
import {createLog, deleteLog, getLogs, updateLog} from "../controller/logs-controller";
import {LogsModel} from "../model/logs-model";

const router = express.Router();
router.use(express.json());

router.get('/get', async (req, res) => {
    try {
        const logs = await getLogs();
        res.status(200).json(logs);
    } catch (error) {
        console.log(error);
        res.status(400).send("Error Getting Logs")
    }
});

router.post('/post', async (req, res) => {
    try {
        const { operationType, incidents, staffId, warehouseId, inventoryId } = req.body;

        const log = new LogsModel(
            "",
            operationType,
            staffId,
            warehouseId,
            inventoryId,
            incidents
        );

        const newLog = await createLog(log);
        if (newLog) {
            res.status(201).send("Log Created Successfully");
        }
    } catch (error) {
        console.log(error);
        res.status(400).send("Failed Create Log")
    }
});

// @ts-ignore
router.patch('/patch/:id', async (req, res) => {
    try {
        const logId = req.params.id;
        const { operationType, incidents, staffId, warehouseId, inventoryId } = req.body;

        if (!logId) {
            return res.status(400).json({ message: "Log ID is required" });
        }

        const log = new LogsModel(
            logId,
            operationType,
            staffId,
            warehouseId,
            inventoryId,
            incidents
        );

        const updatedLog = await updateLog(logId, log);
        if (updatedLog) {
            res.status(204).json("Log Updated Successfully");
        }
    } catch (error) {
        console.log(error);
        res.status(400).send("Failed Update Log")
    }
});

// @ts-ignore
router.delete('/delete/:id', async (req, res) => {
    try {
        const logId = req.params.id;
        if (!logId) {
            return res.status(400).json({ message: "Log ID is required" });
        }
        await deleteLog(logId);
        res.status(200).send("Log Deleted Successfully");
    } catch (error) {
        console.log(error);
        res.status(400).send("Failed Delete Log")
    }
});

export default router;