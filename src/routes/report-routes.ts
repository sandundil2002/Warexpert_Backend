import express from "express";
import {getLowCapacityAlerts, getStockSummary} from "../controller/report-controller";

const router = express.Router();
router.use(express.json());

router.get("/stock-summary", async (req, res) => {
    try {
        const { warehouseId, category } = req.query;

        const query: { warehouseId?: string; category?: string } = {};
        if (typeof warehouseId === "string") query.warehouseId = warehouseId;
        if (typeof category === "string") query.category = category;

        const stockSummary = await getStockSummary(query);

        res.status(200).json(stockSummary);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error generating stock summary." });
    }
});

router.get("/low-capacity-alerts", async (req, res) => {
    try {
        const { thresholdPercentage } = req.query;

        const query: { thresholdPercentage?: number } = {};
        if (typeof thresholdPercentage === "string") {
            query.thresholdPercentage = parseFloat(thresholdPercentage);
        }

        const lowCapacityAlerts = await getLowCapacityAlerts(query);

        res.status(200).json(lowCapacityAlerts);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error generating low capacity alerts." });
    }
});

export default router;