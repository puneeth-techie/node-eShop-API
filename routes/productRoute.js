import express from "express";
import {
  addProduct,
  getAllProduct,
  getProductById,
  updateProductById,
  deleteProductById,
  getFeaturedProduct,
  productImagesUpload,
} from "../controllers/productController.js";
import { adminProtect } from "../middlewares/authCheckHandler.js";
import upload from "../utils/multer.js";

const router = express.Router();

// @route        POST /api/v1/products
// @desc         Adding new product to the DB
// @access       admin
router.route("/").post(adminProtect, upload.single("image"), addProduct);

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
// @access       admin
router.route("/:id").put(adminProtect, updateProductById);

// @route        PUT /api/v1/products/gallery/:id
// @desc         Updating product images by ID
// @access       admin
router
  .route("/gallery/:id")
  .put(adminProtect, upload.array("images", 10), productImagesUpload);

// @route        DELETE /api/v1/products/:id
// @desc         Deleting product from ID
// @access       admin
router.route("/:id").delete(adminProtect, deleteProductById);

export default router;
