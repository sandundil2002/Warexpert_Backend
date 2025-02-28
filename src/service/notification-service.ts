import express from "express";

const router = express.Router();
router.use(express.json());

let notifications = [
    { id: "1", message: "New inventory batch has been added to Warehouse A.", type: "info" },
    { id: "2", message: "Order #1023 has been successfully shipped.", type: "success" },
    { id: "3", message: "Low stock alert: Item ‘Laptop Chargers’ is below the threshold.", type: "error" },
    { id: "4", message: "A new staff member has been assigned to Warehouse B.", type: "info" },
    { id: "5", message: "Scheduled warehouse maintenance is completed successfully.", type: "success" },
    { id: "6", message: "System alert: Unauthorized access attempt detected.", type: "error" },
    { id: "7", message: "Warehouse C temperature monitoring system has been updated.", type: "info" },
    { id: "8", message: "New transportation request approved for supplier delivery.", type: "success" },
    { id: "9", message: "Critical alert: Equipment failure reported in Storage Section 2.", type: "error" }
];

router.get("/get", (req, res) => {
    res.json(notifications);
});

export default router;