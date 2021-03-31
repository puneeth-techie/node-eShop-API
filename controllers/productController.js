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

    const basedir = `${req.protocol}://${req.get("host")}/public/uploads/`;
    let img = "";
    let gallery = [];
    const files = req.files;
    if (files) {
      files.map((file) => {
        if (
          file.mimetype === "image/png" ||
          file.mimetype === "image/jpg" ||
          file.mimetype === "image/jpeg"
        ) {
          gallery.push(`${basedir}${file.filename}`);
        } else if (req.file) {
          image = `${basedir}${req.file.filename}`;
        } else {
          throw createError(400, "Please upload png or jpg format only.");
        }
      });
    }

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
        image: img,
        images: gallery,
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
    //query parameter to get specific categories.
    //http://localhost:5000/api/v1/products?categories=id1,id2
    let filter = {};
    if (req.query.categories) {
      filter = { category: req.query.categories.split(",") };
    }
    const count = await Product.find(filter).countDocuments((count) => count);
    if (!count) throw createError.BadRequest("No more products.");

    const product = await Product.find(filter).populate("category");
    if (!product) {
      throw createError(400, "No products found.");
    } else {
      res.status(200).send({
        TotalProducts: count,
        ProductsLists: product,
      });
    }
  } catch (error) {
    next(error);
  }
};

// @route        GET /api/v1/products/:id
// @desc         Fetching product from ID
const getProductById = async (req, res, next) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      throw createError.BadRequest("Invalid Product ID");
    } else {
      const product = await Product.findById(req.params.id).populate(
        "category"
      );
      if (product) {
        res.status(200).send(product);
      } else {
        throw createError(400, "product with the given ID not found.");
      }
    }
  } catch (error) {
    next(error);
  }
};

// @route        GET /api/v1/products/featured
// @desc         Fetching featured product
const getFeaturedProduct = async (req, res, next) => {
  try {
    const product = await Product.find({ isFeatured: true });
    if (product) {
      res.status(200).send(product);
    } else {
      throw createError(404, "No Featured Product.");
    }
  } catch (error) {
    next(error);
  }
};

// @route        PUT /api/v1/products/:id
// @desc         Updating product using ID
const updateProductById = async (req, res, next) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      throw createError.BadRequest("Invalid Product ID");
    } else {
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

// @route        PUT /api/v1/products/gallery/:id
// @desc         Update product images by product ID
const productImagesUpload = async (req, res, next) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      throw createError.BadRequest("Invalid product ID.");
    } else {
      const basedir = `${req.protocol}://${req.get("host")}/public/uploads/`;
      let gallery = [];
      const files = req.files;
      if (files) {
        files.map((file) => {
          if (
            file.mimetype === "image/png" ||
            file.mimetype === "image/jpg" ||
            file.mimetype === "image/jpeg"
          ) {
            gallery.push(`${basedir}${file.filename}`);
          } else {
            throw createError(400, "Please upload png or jpg format only.");
          }
        });
      }
      const product = await Product.findByIdAndUpdate(
        req.params.id,
        {
          images: gallery,
        },
        { new: true }
      );
      if (!product) {
        throw createError.BadRequest("No product found with the given ID.");
      } else {
        res.status(200).send(product.images);
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
  getFeaturedProduct,
  productImagesUpload,
};
