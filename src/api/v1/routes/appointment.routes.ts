import { Router } from 'express';
import * as controller from '../controllers/appointment.controller';
import validate from '../middleware/validate';
import { appointmentSchema } from '../validators/appointment.validator';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Appointments
 *   description: Appointment management
 */

router.get('/', controller.getAllAppointments);
/**
 * @swagger
 * /appointments:
 *   get:
 *     summary: Get all appointments
 *     tags: [Appointments]
 *     responses:
 *       200:
 *         description: List of appointments
 */

router.get('/:id', controller.getAppointmentById);
/**
 * @swagger
 * /appointments/{id}:
 *   get:
 *     summary: Get appointment by ID
 *     tags: [Appointments]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Appointment details
 *       404:
 *         description: Appointment not found
 */

router.post('/', validate(appointmentSchema), controller.createAppointment);
/**
 * @swagger
 * /appointments:
 *   post:
 *     summary: Book a new appointment
 *     tags: [Appointments]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Appointment'
 *     responses:
 *       201:
 *         description: Appointment created
 */

router.put('/:id', validate(appointmentSchema), controller.updateAppointment);
/**
 * @swagger
 * /appointments/{id}:
 *   put:
 *     summary: Update appointment
 *     tags: [Appointments]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Appointment'
 *     responses:
 *       200:
 *         description: Appointment updated
 */

router.delete('/:id', controller.deleteAppointment);
/**
 * @swagger
 * /appointments/{id}:
 *   delete:
 *     summary: Cancel appointment
 *     tags: [Appointments]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Appointment deleted
 */

export default router;
