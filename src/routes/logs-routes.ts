import express from "express";
import {createLog, getLogs} from "../controller/logs-controller";
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
        const { type, incidents, staffId, warehouseId, inventoryId } = req.body;

        const log = new LogsModel(
            "",
            type,
            staffId,
            warehouseId,
            inventoryId,
            incidents
        );

        const newLog = await createLog(log);
        if (newLog) {
            res.status(201).send(newLog);
        }
    } catch (error) {
        console.log(error);
        res.status(400).send("Failed Create Log")
    }
});

export default router;