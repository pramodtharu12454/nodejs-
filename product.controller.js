import express from "express";
import { productSchema } from "./product.validation.js";
import ProductTable from "./product.model.js";
import { isSeller, isUser } from "../middleware/authentication.middleware.js";
import { validateMongoIdFromReqParams } from "../middleware/validate.mongo.id.js";

const router = express.Router();

router.post(
  "/product/add",
  isSeller,
  async (req, res, next) => {
    try {
      const validatedData = await productSchema.validate(req.body);
      req.body = validatedData;
      next();
    } catch (error) {
      return res.status(402).send({ message: error.message });
    }
  },
  async (req, res) => {
    const newProduct = req.body;

    await ProductTable.create(newProduct);
    return res.status(201).send({ message: "product add successful...." });
  }
);

router.get(
  "/product/detail/:id",
  isUser,
  validateMongoIdFromReqParams,
  (req, res) => {
    return res.status(200).send({ message: "product details.." });
  }
);

export { router as productController };
