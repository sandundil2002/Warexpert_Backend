import express from "express";
import warehouseRoutes from "./src/routes/warehouse-routes";
import staffRoutes from "./src/routes/staff-routes";
import inventoryRoutes from "./src/routes/inventory-routes";
import customerRoutes from "./src/routes/customer-routes";

const app = express();

app.use('/',(req,res,next)=>{
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE");
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, content-type');
    next();
});

app.use('/warehouse', warehouseRoutes);
app.use('/staff', staffRoutes);
app.use('/inventory', inventoryRoutes);
app.use('/customer', customerRoutes);

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});

app.use('/', (req, res, next) => {
    res.status(200).send('Not Found');
});