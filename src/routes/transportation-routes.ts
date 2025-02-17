import express from "express";
import {
    createTransportation,
    deleteTransportation,
    getTransportations,
    updateTransportation
} from "../controller/transportation-controller";
import {TransportationModel} from "../model/transportation-model";

const router = express.Router();
router.use(express.json());

router.get('/get', async (req, res) => {
    try {
        const inventories = await getTransportations();
        res.status(200).json(inventories);
    } catch (error) {
        console.log(error);
        res.status(400).send("Error Getting Inventories")
    }
});

router.post('/post', async (req, res) => {
    try {
        const { type, capacity, numberPlate, status, driverId } = req.body;
        const transportation = new TransportationModel(
            "",
            type,
            Number(capacity),
            numberPlate,
            status,
            driverId
        );

        const addedTransportation = await createTransportation(transportation);
        if (addedTransportation) {
            res.status(201).json(addedTransportation);
        }
    } catch (error) {
        console.log(error);
        res.status(400).send("Failed Create Transportation Item")
    }
});

// @ts-ignore
router.patch('/patch/:id', async (req, res) => {
    try {
        const transportationId = req.params.id;
        const { type, capacity, numberPlate, status, driverId } = req.body;

        if (!transportationId) {
            return res.status(400).json({ message: "Transportation ID is required" });
        }

        const transportation = new TransportationModel(
            transportationId,
            type,
            Number(capacity),
            numberPlate,
            status,
            driverId
        );

        const updatedTransportation = await updateTransportation(transportationId, transportation);
        if (updatedTransportation) {
            res.status(200).json(updatedTransportation);
        }
    } catch (error) {
        console.log(error);
        res.status(400).send("Failed Update Transportation Item")
    }
});

// @ts-ignore
router.delete('/delete/:id', async (req, res) => {
    try {
        const transportationId = req.params.id;
        if (!transportationId) {
            return res.status(400).json({ message: "Transportation ID is required" });
        }

        await deleteTransportation(transportationId);
        res.status(204).send("Transportation Deleted");
    } catch (error) {
        console.log(error);
        res.status(400).send("Failed Delete Transportation Item")
    }
});

export default router;