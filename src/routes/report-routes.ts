import express from "express";
import {
    getLowCapacityAlertsController,
    getStockSummaryController
} from "../controller/report-controller";

const router = express.Router();
router.use(express.json());

router.get("/stock-summary", getStockSummaryController);

router.get("/low-capacity-alerts", getLowCapacityAlertsController);

export default router;