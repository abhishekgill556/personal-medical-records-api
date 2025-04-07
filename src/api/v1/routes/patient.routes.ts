import { Router, Request, Response } from 'express';

const router = Router();

router.get('/', (_req: Request, res: Response) => {
  res.send('Get all patients');
});

router.get('/:id', (_req: Request, res: Response) => {
  res.send('Get patient by ID');
});

router.post('/', (_req: Request, res: Response) => {
  res.send('Create patient');
});

router.put('/:id', (_req: Request, res: Response) => {
  res.send('Update patient');
});

router.delete('/:id', (_req: Request, res: Response) => {
  res.send('Delete patient');
});

export default router;
