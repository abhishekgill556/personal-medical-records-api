import { Request, Response } from 'express';
import * as patientService from '../services/patient.service';

export const getAllPatients = async (_req: Request, res: Response): Promise<void> => {
  const patients = await patientService.getAllPatients();
  res.status(200).json(patients);
};

export const getPatientById = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const patient = await patientService.getPatientById(id);
  if (!patient) {
    res.status(404).json({ message: 'Patient not found' });
    return;
  }
  res.status(200).json(patient);
};

export const createPatient = async (req: Request, res: Response): Promise<void> => {
  const newPatient = await patientService.createPatient(req.body);
  res.status(201).json(newPatient);
};

export const updatePatient = async (req: Request, res: Response): Promise<void> => {
  const updatedPatient = await patientService.updatePatient(req.params.id, req.body);
  res.status(200).json(updatedPatient);
};

export const deletePatient = async (req: Request, res: Response): Promise<void> => {
  await patientService.deletePatient(req.params.id);
  res.status(204).send();
};
