import { Router } from 'express';
import * as controller from '../controllers/doctor.controller';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Doctors
 *   description: Doctor management
 */

router.get('/', controller.getAllDoctors);
/**
 * @swagger
 * /doctors:
 *   get:
 *     summary: Get all doctors
 *     tags: [Doctors]
 *     responses:
 *       200:
 *         description: List of doctors
 */

router.get('/:id', controller.getDoctorById);
/**
 * @swagger
 * /doctors/{id}:
 *   get:
 *     summary: Get doctor by ID
 *     tags: [Doctors]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *     responses:
 *       200:
 *         description: Doctor found
 *       404:
 *         description: Doctor not found
 */

router.post('/', controller.createDoctor);
/**
 * @swagger
 * /doctors:
 *   post:
 *     summary: Create doctor profile
 *     tags: [Doctors]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Doctor'
 *     responses:
 *       201:
 *         description: Doctor created
 */

router.put('/:id', controller.updateDoctor);
/**
 * @swagger
 * /doctors/{id}:
 *   put:
 *     summary: Update doctor profile
 *     tags: [Doctors]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Doctor'
 *     responses:
 *       200:
 *         description: Doctor updated
 */

router.delete('/:id', controller.deleteDoctor);
/**
 * @swagger
 * /doctors/{id}:
 *   delete:
 *     summary: Delete doctor profile
 *     tags: [Doctors]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Doctor deleted
 */

export default router;
