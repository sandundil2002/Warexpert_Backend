import express from "express";
import warehouseRoutes from "./src/routes/warehouse-routes";
import staffRoutes from "./src/routes/staff-routes";
import inventoryRoutes from "./src/routes/inventory-routes";
import customerRoutes from "./src/routes/customer-routes";
import logsRoutes from "./src/routes/logs-routes";
import equipmentRouter from "./src/routes/equipment-router";
import transportationRoutes from "./src/routes/transportation-routes";
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes, {authenticateToken} from "./src/routes/auth-routes";
import reportRoutes from "./src/routes/report-routes";
import userRoutes from "./src/routes/user-routes";
import paymentRoutes from "./src/routes/payment-routes";
import trackingService from "./src/service/tracking-service";

dotenv.config();
const app = express();

app.use(cors({
    origin: ['http://localhost:5173', 'http://localhost:8081', 'http://192.168.8.143:8081'],
    methods: ['GET', 'POST', 'PATCH', 'DELETE'],
    credentials: true,
}));

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

app.use('/tracking', trackingService);
app.use('/auth', authRoutes);

app.use(authenticateToken);
app.use('/warehouse', warehouseRoutes);
app.use('/staff', staffRoutes);
app.use('/inventory', inventoryRoutes);
app.use('/customer', customerRoutes);
app.use('/logs', logsRoutes);
app.use('/equipment', equipmentRouter);
app.use('/transportation', transportationRoutes);
app.use('/reports', reportRoutes);
app.use('/user', userRoutes);
app.use('/payment', paymentRoutes);

app.listen(3000, "0.0.0.0", () => {
    console.log("Server is running on port 3000 and accessible to all devices");
});

app.use('/', (req, res, next) => {
    res.status(200).send('Not Found');
});