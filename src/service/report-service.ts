import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

interface StockSummaryQuery {
    warehouseId?: string;
    category?: string;
}

export const getStockSummary = async (query: StockSummaryQuery) => {
    try {
        const whereClause: any = {};
        if (query.warehouseId) whereClause["warehouseId"] = query.warehouseId;
        if (query.category) whereClause["category"] = query.category;

        const stockSummary = await prisma.inventoryItem.groupBy({
            by: ["warehouseId", "category"],
            _count: {
                id: true,
            },
            _sum: {
                quantity: true,
            },
            where: whereClause,
        });

        return stockSummary;
    } catch (error) {
        console.error("Error fetching stock summary:", error);
        throw new Error("Failed to fetch stock summary.");
    }
};

interface LowCapacityQuery {
    thresholdPercentage?: number; // Default: 80%
}

export const getLowCapacityAlerts = async (query: LowCapacityQuery) => {
    try {
        const { thresholdPercentage = 80 } = query;

        // Fetch all warehouses and their inventory items
        const warehouses = await prisma.warehouse.findMany({
            include: {
                inventory: true, // Include related inventory items
            },
        });

        // Calculate low capacity alerts
        const lowCapacityAlerts = warehouses
            .map((warehouse) => {
                const totalQuantity = warehouse.inventory.reduce(
                    (sum, item) => sum + (item.quantity || 0),
                    0
                );
                const capacityUsedPercentage = (totalQuantity / warehouse.capacity) * 100;

                if (capacityUsedPercentage >= thresholdPercentage) {
                    return {
                        warehouseId: warehouse.id,
                        warehouseName: warehouse.name,
                        totalQuantity,
                        capacity: warehouse.capacity,
                        capacityUsedPercentage,
                    };
                }
                return null;
            })
            .filter(Boolean); // Filter out warehouses below the threshold

        return lowCapacityAlerts;
    } catch (error) {
        console.error("Error fetching low capacity alerts:", error);
        throw new Error("Failed to fetch low capacity alerts.");
    }
};