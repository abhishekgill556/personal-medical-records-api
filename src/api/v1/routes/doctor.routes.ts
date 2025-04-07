import { Router } from 'express';
import * as controller from '../controllers/doctor.controller';

const router = Router();

router.get('/', controller.getAllDoctors);
router.get('/:id', controller.getDoctorById);
router.post('/', controller.createDoctor);
router.put('/:id', controller.updateDoctor);
router.delete('/:id', controller.deleteDoctor);

export default router;
