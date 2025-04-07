import { Router, Request, Response } from 'express';

const router = Router();

router.get('/:patientId', (_req: Request, res: Response) => {
  res.send('Get prescriptions for patient');
});

router.post('/', (_req: Request, res: Response) => {
  res.send('Add prescription');
});

export default router;
