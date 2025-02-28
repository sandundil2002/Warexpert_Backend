import {PrismaClient} from "@prisma/client";

const prisma = new PrismaClient();

interface StockSummaryQuery {
    warehouseId?: string;
    category?: string;
}

interface LowCapacityQuery {
    thresholdPercentage?: number;
}

export const getStockSummary = async (query: StockSummaryQuery) => {
    try {
        const whereClause: any = {};
        if (query.warehouseId) whereClause["warehouseId"] = query.warehouseId;
        if (query.category) whereClause["category"] = query.category;

        return await prisma.inventoryItem.groupBy({
            by: ["warehouseId", "category"],
            _count: {
                id: true,
            },
            _sum: {
                quantity: true,
            },
            where: whereClause,
        });
    } catch (error) {
        console.error("Error fetching stock summary:", error);
        throw new Error("Failed to fetch stock summary.");
    }
};

export const getLowCapacityAlerts = async (query: LowCapacityQuery) => {
    try {
        const { thresholdPercentage = 80 } = query;

        const warehouses = await prisma.warehouse.findMany({
            include: {
                inventory: true,
            },
        });

        return warehouses
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
            .filter(Boolean);
    } catch (error) {
        console.error("Error fetching low capacity alerts:", error);
        throw new Error("Failed to fetch low capacity alerts.");
    }
};