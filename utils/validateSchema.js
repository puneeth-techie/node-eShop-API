import Joi from "joi";

const validateCategorySchema = Joi.object({
  name: Joi.string().required(),
  color: Joi.string().required(),
  icon: Joi.string().required(),
});

const validateProductSchema = Joi.object({
  name: Joi.string().min(5).max(255).required(),
  description: Joi.string(),
  richDescription: Joi.string(),
  image: Joi.string(),
  images: Joi.string(),
  brand: Joi.string(),
  price: Joi.number().positive(),
  category: Joi.string(),
  countInStock: Joi.number().min(5).max(255),
  rating: Joi.number(),
  numReviews: Joi.number(),
  isFeatured: Joi.boolean(),
});

export { validateCategorySchema, validateProductSchema };
