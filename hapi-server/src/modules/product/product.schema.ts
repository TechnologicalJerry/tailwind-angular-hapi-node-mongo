import Joi from 'joi';

export const createProductSchema = Joi.object({
  name: Joi.string().min(1).max(200).required(),
  description: Joi.string().min(1).max(2000).required(),
  price: Joi.number().min(0).required(),
  category: Joi.string().min(1).max(100).required(),
  stock: Joi.number().integer().min(0).default(0),
  imageUrl: Joi.string().uri().optional(),
});

export const updateProductSchema = Joi.object({
  name: Joi.string().min(1).max(200).optional(),
  description: Joi.string().min(1).max(2000).optional(),
  price: Joi.number().min(0).optional(),
  category: Joi.string().min(1).max(100).optional(),
  stock: Joi.number().integer().min(0).optional(),
  imageUrl: Joi.string().uri().optional().allow(''),
});

export const productIdParamSchema = Joi.object({
  id: Joi.string()
    .regex(/^[0-9a-fA-F]{24}$/)
    .required()
    .description('MongoDB ObjectId'),
});
