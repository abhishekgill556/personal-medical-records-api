import { Router } from 'express';
import * as controller from '../controllers/appointment.controller';
import validate from '../middleware/validate';
import { appointmentSchema } from '../validators/appointment.validator';

const router = Router();


router.get('/', controller.getAllAppointments);
router.get('/:id', controller.getAppointmentById);
router.post('/', validate(appointmentSchema), controller.createAppointment);
router.put('/:id', validate(appointmentSchema), controller.updateAppointment);
router.delete('/:id', controller.deleteAppointment);

export default router;
