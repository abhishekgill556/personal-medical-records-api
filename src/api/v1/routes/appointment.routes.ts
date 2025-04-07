import { Router, Request, Response } from 'express';

const router = Router();

router.get('/', (_req: Request, res: Response) => {
  res.send('Get all appointments');
});

router.get('/:id', (_req: Request, res: Response) => {
  res.send('Get appointment by ID');
});

router.post('/', (_req: Request, res: Response) => {
  res.send('Book appointment');
});

router.put('/:id', (_req: Request, res: Response) => {
  res.send('Update appointment');
});

router.delete('/:id', (_req: Request, res: Response) => {
  res.send('Cancel appointment');
});

export default router;
