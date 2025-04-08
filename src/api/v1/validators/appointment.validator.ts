import Joi from 'joi';

export const appointmentSchema = Joi.object({
  patientId: Joi.string().required(),
  doctorId: Joi.string().required(),
  date: Joi.string().isoDate().required(), // e.g., "2025-04-15T10:00:00Z"
  reason: Joi.string().min(3).required(),
  status: Joi.string().valid('Booked', 'Completed', 'Cancelled').optional()
});
