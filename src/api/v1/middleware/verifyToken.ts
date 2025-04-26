import { Request, Response, NextFunction } from 'express';
import * as admin from 'firebase-admin';

export const verifyToken = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(401).json({ message: 'Missing or invalid Authorization header' });
    return;
  }

  const token = authHeader.split(' ')[1];

  try {
    const decodedToken = await admin.auth().verifyIdToken(token);
    (req as any).user = decodedToken; // store decoded token in req.user
    next(); // go to next middleware
  } catch (error) {
    res.status(401).json({ message: 'Unauthorized: Invalid token' });
  }
};
