import Joi from "joi";

const validateCategorySchema = Joi.object({
  name: Joi.string().required(),
  color: Joi.string().required(),
  icon: Joi.string().required(),
});

export { validateCategorySchema };
