import express from "express";
import {
  addCategory,
  getAllCategory,
  getCategoryById,
  deleteCategoryById,
  updateCategoryById,
} from "../controllers/categoryController.js";
import { adminProtect } from "../middlewares/authCheckHandler.js";

const router = express.Router();

// @route        POST /api/categories
// @desc         Adding new categories to the DB
// @access       admin
router.route("/").post(adminProtect, addCategory);

// @route        GET /api/categories
// @desc         Fetching all categories lists.
// @access       public
router.route("/").get(getAllCategory);

// @route        GET /api/categories/:id
// @desc         Fetching category by ID
// @access       Public
router.route("/:id").get(getCategoryById);

// @route        PUT /api/categories/:id
// @desc         Updating category by ID
// @access       admin
router.route("/:id").put(adminProtect, updateCategoryById);

// @route        DELETE /api/categories/:id
// @desc         Deleting category by ID
// @access       admin
router.route("/:id").delete(adminProtect, deleteCategoryById);

export default router;
