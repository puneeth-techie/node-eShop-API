import express from "express";
import { addProduct } from "../controllers/productController.js";

const router = express.Router();

// @route        POST /api/products
// @desc         Adding new product to the DB
// @access       Public
router.route("/").post(addProduct);

export default router;
