import { Router } from 'express';
import * as controller from '../controllers/appointment.controller';

const router = Router();

router.get('/', controller.getAllAppointments);
router.get('/:id', controller.getAppointmentById);
router.post('/', controller.createAppointment);
router.put('/:id', controller.updateAppointment);
router.delete('/:id', controller.deleteAppointment);

export default router;
