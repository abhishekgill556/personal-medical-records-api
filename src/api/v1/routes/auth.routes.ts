import { Router, Request, Response } from 'express';

const router = Router();

router.post('/signup', (_req: Request, res: Response) => {
  res.send('Signup - stub');
});

router.post('/login', (_req: Request, res: Response) => {
  res.send('Login - stub');
});

export default router;
