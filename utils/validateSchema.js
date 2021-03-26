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

const validateUserSchema = Joi.object({
  name: Joi.string().min(5).max(255).required(),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
    .required(),
  password: Joi.string().min(5).max(18).required(),
  street: Joi.string(),
  apartment: Joi.string(),
  city: Joi.string(),
  zip: Joi.number(),
  country: Joi.string(),
  phone: Joi.number().required(),
  isAdmin: Joi.boolean(),
});

export { validateCategorySchema, validateProductSchema, validateUserSchema };
