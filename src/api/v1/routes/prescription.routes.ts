import { Router } from 'express';
import * as controller from '../controllers/prescription.controller';
import validate from '../middleware/validate';
import { prescriptionSchema } from '../validators/prescription.validator';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Prescriptions
 *   description: Prescription management
 */

router.get('/:patientId', controller.getPrescriptionsByPatientId);
/**
 * @swagger
 * /prescriptions/{patientId}:
 *   get:
 *     summary: Get prescriptions for a patient
 *     tags: [Prescriptions]
 *     parameters:
 *       - in: path
 *         name: patientId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of prescriptions
 */

router.post('/', validate(prescriptionSchema), controller.createPrescription);
/**
 * @swagger
 * /prescriptions:
 *   post:
 *     summary: Create a prescription
 *     tags: [Prescriptions]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Prescription'
 *     responses:
 *       201:
 *         description: Prescription added
 */

export default router;
