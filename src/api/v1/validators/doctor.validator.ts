import Joi from 'joi';

export const doctorSchema = Joi.object({
  name: Joi.string().min(2).required(),
  specialization: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string().optional()
});
