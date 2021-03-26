import express from "express";
import {
  addProduct,
  getAllProduct,
  getProductById,
  updateProductById,
  deleteProductById,
  getFeaturedProduct,
} from "../controllers/productController.js";
import { adminProtect } from "../middlewares/authCheckHandler.js";

const router = express.Router();

// @route        POST /api/v1/products
// @desc         Adding new product to the DB
// @access       Public
router.route("/").post(adminProtect, addProduct);

// @route        GET /api/v1/products
// @desc         Fetching all product lists from the DB
// @access       Public
router.route("/").get(getAllProduct);

// @route        GET /api/v1/products/:id
// @desc         Fetching product from ID
// @access       Public
router.route("/:id").get(getProductById);

// @route        GET /api/v1/get/products/featured
// @desc         Fetching featured product
// @access       Public
router.route("/get/featured").get(getFeaturedProduct);

// @route        PUT /api/v1/products/:id
// @desc         Updating product from ID
// @access       Public
router.route("/:id").put(adminProtect, updateProductById);

// @route        DELETE /api/v1/products/:id
// @desc         Deleting product from ID
// @access       Public
router.route("/:id").delete(adminProtect, deleteProductById);

export default router;
