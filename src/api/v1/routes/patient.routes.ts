import { Router } from 'express';
import * as controller from '../controllers/patient.controller';

const router = Router();

router.get('/', controller.getAllPatients);
router.get('/:id', controller.getPatientById);
router.post('/', controller.createPatient);
router.put('/:id', controller.updatePatient);
router.delete('/:id', controller.deletePatient);

export default router;
