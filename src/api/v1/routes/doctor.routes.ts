import { Router, Request, Response } from 'express';

const router = Router();

router.get('/', (_req: Request, res: Response) => {
  res.send('Get all doctors');
});

router.get('/:id', (_req: Request, res: Response) => {
  res.send('Get doctor by ID');
});

router.post('/', (_req: Request, res: Response) => {
  res.send('Create doctor');
});

router.put('/:id', (_req: Request, res: Response) => {
  res.send('Update doctor');
});

router.delete('/:id', (_req: Request, res: Response) => {
  res.send('Delete doctor');
});

export default router;
