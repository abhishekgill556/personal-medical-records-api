import { Request, Response } from 'express';
import * as prescriptionService from '../services/prescription.service';

export const getPrescriptionsByPatientId = async (req: Request, res: Response): Promise<void> => {
  const { patientId } = req.params;
  const prescriptions = await prescriptionService.getPrescriptionsByPatientId(patientId);
  res.status(200).json(prescriptions);
};

export const createPrescription = async (req: Request, res: Response): Promise<void> => {
  const newPrescription = await prescriptionService.createPrescription(req.body);
  res.status(201).json(newPrescription);
};
