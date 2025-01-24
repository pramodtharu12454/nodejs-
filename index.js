import express from "express";
import mongoose from "mongoose";
import connectDB from "./user/db.connection.js";
import { userController } from "./user/user.controller.js";
import { productController } from "./product/product.controller.js";
//  create app in backend
const app = express();
// to make app understand json
app.use(express.json());
// connect database

await connectDB();
//  register routes/controller
app.use(userController);
app.use(productController);
// network port
const PORT = 8080;
app.listen(PORT, () => {
  console.log(`this server is running in ${PORT}`);
});
