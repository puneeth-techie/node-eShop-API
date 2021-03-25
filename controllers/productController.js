import Product from "../models/productModel.js";
import createError from "http-errors";
import { validateProductSchema } from "../utils/validateSchema.js";
import Category from "../models/categoryModel.js";
import mongoose from "mongoose";

// @route        POST /api/v1/products
// @desc         Adding new products to the DB
const addProduct = async (req, res, next) => {
  try {
    const { error } = validateProductSchema.validateAsync(req.body);
    if (error) throw createError.BadRequest(error);

    const {
      name,
      description,
      richDescription,
      image,
      images,
      brand,
      price,
      category,
      countInStock,
      rating,
      numReviews,
      isFeatured,
    } = req.body;

    const cat = await Category.findById(category);
    if (!cat) {
      throw createError.BadRequest(
        "No category found. Please add correct category ID."
      );
    } else {
      const product = new Product({
        name,
        description,
        richDescription,
        image,
        images,
        brand,
        price,
        category,
        countInStock,
        rating,
        numReviews,
        isFeatured,
      });
      await product.save();
      res.status(200).send(product);
    }
  } catch (error) {
    next(error);
  }
};

// @route        GET /api/v1/products
// @desc         Fetching all products lists.
const getAllProduct = async (req, res, next) => {
  try {
    const product = await Product.find().populate("category");
    if (!product) {
      throw createError(400, "No products found.");
    } else {
      res.status(200).send(product);
    }
  } catch (error) {
    next(error);
  }
};

// @route        GET /api/v1/products/:id
// @desc         Fetching product from ID
const getProductById = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id).populate("category");
    if (product) {
      res.status(200).send(product);
    } else {
      throw createError(400, "product with the given ID not found.");
    }
  } catch (error) {
    next(error);
  }
};

// @route        PUT /api/v1/products/:id
// @desc         Updating product using ID
const updateProductById = async (req, res, next) => {
  try {
    const { error } = validateProductSchema.validateAsync(req.body);
    if (error) throw createError.BadRequest(error);
    const {
      name,
      description,
      richDescription,
      image,
      images,
      brand,
      price,
      category,
      countInStock,
      rating,
      numReviews,
      isFeatured,
    } = req.body;

    const cat = await Category.findById(category);
    if (!cat) {
      throw createError.BadRequest("Invalid category ID.");
    } else {
      const product = await Product.findByIdAndUpdate(
        req.params.id,
        {
          name,
          description,
          richDescription,
          image,
          images,
          brand,
          price,
          category,
          countInStock,
          rating,
          numReviews,
          isFeatured,
        },
        { new: true }
      );
      if (product) {
        res.status(200).send(product);
      } else {
        throw createError(400, "The product ID not found.");
      }
    }
  } catch (error) {
    next(error);
  }
};

// @route        DELETE /api/v1/products/:id
// @desc         Deleting product from ID
const deleteProductById = async (req, res, next) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      throw createError.BadRequest("Invalid Product ID");
    } else {
      const product = await Product.findByIdAndRemove(req.params.id);
      if (product) {
        res.status(200).json({
          Message: "The given product deleted.",
        });
      } else {
        throw createError(400, "The product with the given ID not found.");
      }
    }
  } catch (error) {
    next(error);
  }
};
export {
  addProduct,
  getAllProduct,
  getProductById,
  updateProductById,
  deleteProductById,
};