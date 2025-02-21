import { Request, Response } from "express";
import {getLowCapacityAlerts, getStockSummary} from "../service/report-service";

export const getStockSummaryController = async (req: Request, res: Response) => {
    try {
        // Extract query parameters
        const { warehouseId, category } = req.query;

        // Validate and transform query parameters
        const query: { warehouseId?: string; category?: string } = {};
        if (typeof warehouseId === "string") query.warehouseId = warehouseId;
        if (typeof category === "string") query.category = category;

        // Call the service function
        const stockSummary = await getStockSummary(query);

        // Send the response
        res.status(200).json(stockSummary);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error generating stock summary." });
    }
};

export const getLowCapacityAlertsController = async (req: Request, res: Response) => {
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
};