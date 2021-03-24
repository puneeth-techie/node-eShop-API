import express from "express";
import {
  addCategory,
  getAllCategory,
  getCategoryById,
  deleteCategoryById,
  updateCategoryById,
} from "../controllers/categoryController.js";

const router = express.Router();

// @route        POST /api/categories
// @desc         Adding new categories to the DB
// @access       Public
router.route("/").post(addCategory);

// @route        GET /api/categories
// @desc         Fetching all categories lists.
// @access       Public
router.route("/").get(getAllCategory);

// @route        GET /api/categories/:id
// @desc         Fetching category by ID
// @access       Public
router.route("/:id").get(getCategoryById);

// @route        PUT /api/categories/:id
// @desc         Updating category by ID
// @access       Public
router.route("/:id").put(updateCategoryById);

// @route        DELETE /api/categories/:id
// @desc         Deleting category by ID
// @access       Public
router.route("/:id").delete(deleteCategoryById);
