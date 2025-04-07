import { Router } from 'express';
import * as controller from '../controllers/patient.controller';
import validate from '../middleware/validate';
import { patientSchema } from '../validators/patient.validator';

const router = Router();

router.get('/', controller.getAllPatients);
router.get('/:id', controller.getPatientById);
router.post('/', validate(patientSchema), controller.createPatient);
router.put('/:id', validate(patientSchema), controller.updatePatient);
router.delete('/:id', controller.deletePatient);

export default router;
