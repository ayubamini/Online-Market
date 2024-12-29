require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

//Controllers
const UserController = require("./controllers/userController");
const AuthController = require("./controllers/authController");
const OrderController = require("./controllers/orderController");
const CategoryController = require("./controllers/categoryController");
const ReportController = require("./controllers/reportController");
const ProductController = require("./controllers/productController");

var cors = require("cors");
const app = express();
let HTTP_PORT = process.env.PORT || 8080;

// MongoDB connection
mongoose.connect(process.env.DB_CONN, {});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB");
});

app.use(express.json());
app.use(cors());

// Users APIs
app.get("/api/users", UserController.getAllUsers);
app.get("/api/users/:id", UserController.getUserById, UserController.getUser);
app.post("/api/addStaff", UserController.createUser);
app.patch(
  "/api/users/:id",
  UserController.getUserById,
  UserController.updateUser
);
app.delete(
  "/api/users/:id",
  UserController.getUserById,
  UserController.deleteUser
);

// Auth APIs
app.post("/api/signin", AuthController.signIn);
app.post("/api/signup", AuthController.signUp);
app.post("/api/resetPassword", AuthController.resetPassword);

//Orders APIs
app.get("/api/orders", AuthController.auth, OrderController.getAllOrders);
app.get("/api/orders/order", AuthController.auth, OrderController.getOrder);
app.put("/api/orders/updateStatus", AuthController.auth, OrderController.updateOrderStatus);
app.get("/api/orders/todayorders", AuthController.auth, OrderController.getTodaysPickupOrders);
app.post("/api/orders/add", OrderController.addOrder);
app.get("/api/orders/customer/:customerId", OrderController.getOrdersByCustomerId);
app.get("/api/orders/amount", OrderController.getNumberOfOrders);
app.get("/api/orders/:orderNo", OrderController.getOrderByOrderNo);



//Categories API
app.get("/api/categories", CategoryController.getCategories);
app.post("/api/categories", AuthController.auth, CategoryController.addCategory);
app.put("/api/categories", AuthController.auth, CategoryController.updateCategories);

//Reports
app.get("/api/report/salesReport", AuthController.auth, ReportController.getSalesReport);
app.get("/api/report/inventoryReport",AuthController.auth, ReportController.getInventoryReport);
app.get("/api/report/productReport", AuthController.auth, ReportController.getProductReport);


//Products
app.get('/api/products', ProductController.getAllProducts);
app.get('/api/products/:name', ProductController.getProductByName);
app.get('/api/product', ProductController.getProductById);
app.post('/api/products', AuthController.auth, ProductController.createOrUpdateProduct);
app.delete('/api/product', AuthController.auth, ProductController.deleteProduct);


app.listen(HTTP_PORT, () => {
  console.log(`Server running on port ${HTTP_PORT}`);
});

module.exports = app;
