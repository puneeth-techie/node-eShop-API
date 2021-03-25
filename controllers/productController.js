import Product from "../models/productModel.js";
import createError from "http-errors";
import { validateProductSchema } from "../utils/validateSchema.js";
import Category from "../models/categoryModel.js";

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

    const category = await Category.findById(category);
    if (!category) {
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

export { addProduct };
