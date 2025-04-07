import { Router } from 'express';
import * as controller from '../controllers/prescription.controller';
import validate from '../middleware/validate';
import { prescriptionSchema } from '../validators/prescription.validator';


const router = Router();

router.get('/:patientId', controller.getPrescriptionsByPatientId);
router.post('/', validate(prescriptionSchema), controller.createPrescription);

export default router;
