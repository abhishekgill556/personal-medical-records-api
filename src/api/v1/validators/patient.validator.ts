import Joi from 'joi';

export const patientSchema = Joi.object({
  name: Joi.string().min(2).required(),
  age: Joi.number().min(0).required(),
  medicalHistory: Joi.array().items(Joi.string()).required(),
});
