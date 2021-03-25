import express from "express";
import {
  addProduct,
  getAllProduct,
  getProductById,
  updateProductById,
  deleteProductById,
} from "../controllers/productController.js";

const router = express.Router();

// @route        POST /api/v1/products
// @desc         Adding new product to the DB
// @access       Public
router.route("/").post(addProduct);

// @route        GET /api/v1/products
// @desc         Fetching all product lists from the DB
// @access       Public
router.route("/").get(getAllProduct);

// @route        GET /api/v1/products/:id
// @desc         Fetching product from ID
// @access       Public
router.route("/:id").get(getProductById);

// @route        PUT /api/v1/products/:id
// @desc         Updating product from ID
// @access       Public
router.route("/:id").put(updateProductById);

// @route        DELETE /api/v1/products/:id
// @desc         Deleting product from ID
// @access       Public
router.route("/:id").delete(deleteProductById);

export default router;
