import createError from "http-errors";
import Category from "../models/categoryModel.js";
import { validateCategorySchema } from "../utils/validateSchema.js";

// @route        POST /api/v1/categories
// @desc         Adding new categories to the DB
const addCategory = async (req, res, next) => {
  try {
    //Validating the category schema.
    const { error } = validateCategorySchema.validateAsync(req.body);
    if (error) throw createError(400, error.message);

    //destructuring the req.body
    const { name, color, icon } = req.body;

    //Adding categories to the DB
    let category = new Category({
      name,
      color,
      icon,
    });

    //Saving category to the DB
    category = await category.save();
    res.status(200).send(category);
  } catch (error) {
    //createError(500, error.message);
    next(error);
  }
};

// @route        GET /api/v1/categories
// @desc         Fetching all categories lists.
const getAllCategory = async (req, res, next) => {
  try {
    const category = await Category.find();
    if (!category) {
      throw createError(400, "No categories found.");
    } else {
      res.status(200).send(category);
    }
  } catch (error) {
    next(error);
  }
};

// @route        GET /api/v1/categories/:id
// @desc         Fetching category by ID
const getCategoryById = async (req, res, next) => {
  try {
    const category = await Category.findById(req.params.id);
    if (category) {
      res.status(200).send(category);
    } else {
      throw createError(400, "Category with the given ID not found.");
    }
  } catch (error) {
    next(error);
  }
};

// @route        PUT /api/v1/categories/:id
// @desc         Updating category by ID
const updateCategoryById = async (req, res, next) => {
  try {
    const { error } = validateCategorySchema.validateAsync(req.body);
    if (error) throw createError(400, error.details[0].message);
    const { name, color, icon } = req.body;
    const category = await Category.findByIdAndUpdate(
      req.params.id,
      {
        name,
        color,
        icon,
      },
      { new: true }
    );
    if (category) {
      res.status(200).send(category);
    } else {
      throw createError(400, "The given ID not found.");
    }
  } catch (error) {
    next(error);
  }
};

// @route        DELETE /api/v1/categories/:id
// @desc         Deleting category by ID
const deleteCategoryById = async (req, res, next) => {
  try {
    const category = await Category.findByIdAndRemove(req.params.id);
    if (category) {
      res.status(200).json({
        Message: "The given ID category deleted.",
      });
    } else {
      throw createError(400, "The category with the given ID not found.");
    }
  } catch (error) {
    next(error);
  }
};

export {
  addCategory,
  getAllCategory,
  getCategoryById,
  deleteCategoryById,
  updateCategoryById,
};
