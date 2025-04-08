import { Router } from 'express';
import * as controller from '../controllers/patient.controller';
import validate from '../middleware/validate';
import { patientSchema } from '../validators/patient.validator';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Patients
 *   description: Patient management
 */

router.get('/', controller.getAllPatients);
/**
 * @swagger
 * /patients:
 *   get:
 *     summary: Get all patients
 *     tags: [Patients]
 *     responses:
 *       200:
 *         description: List of patients
 */

router.get('/:id', controller.getPatientById);
/**
 * @swagger
 * /patients/{id}:
 *   get:
 *     summary: Get patient by ID
 *     tags: [Patients]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Patient details
 *       404:
 *         description: Not found
 */

router.post('/', validate(patientSchema), controller.createPatient);
/**
 * @swagger
 * /patients:
 *   post:
 *     summary: Create patient
 *     tags: [Patients]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Patient'
 *     responses:
 *       201:
 *         description: Patient created
 */

router.put('/:id', validate(patientSchema), controller.updatePatient);
/**
 * @swagger
 * /patients/{id}:
 *   put:
 *     summary: Update patient
 *     tags: [Patients]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Patient'
 *     responses:
 *       200:
 *         description: Patient updated
 */

router.delete('/:id', controller.deletePatient);
/**
 * @swagger
 * /patients/{id}:
 *   delete:
 *     summary: Delete patient
 *     tags: [Patients]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Patient deleted
 */

export default router;
