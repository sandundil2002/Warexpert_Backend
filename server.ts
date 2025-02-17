import express from "express";
import warehouseRoutes from "./src/routes/warehouse-routes";
import staffRoutes from "./src/routes/staff-routes";
import inventoryRoutes from "./src/routes/inventory-routes";
import customerRoutes from "./src/routes/customer-routes";
import logsRoutes from "./src/routes/logs-routes";
import equipmentRouter from "./src/routes/equipment-router";
import transportationRoutes from "./src/routes/transportation-routes";
import bodyParser from 'body-parser';

const app = express();

app.use('/',(req,res,next)=>{
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE");
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, content-type');
    next();
});

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

app.use('/warehouse', warehouseRoutes);
app.use('/staff', staffRoutes);
app.use('/inventory', inventoryRoutes);
app.use('/customer', customerRoutes);
app.use('/logs', logsRoutes);
app.use('/equipment', equipmentRouter);
app.use('/transportation', transportationRoutes);

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});

app.use('/', (req, res, next) => {
    res.status(200).send('Not Found');
});