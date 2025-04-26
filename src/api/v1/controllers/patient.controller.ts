import { Request, Response } from 'express';
import * as patientService from '../services/patient.service';

export const getAllPatients = async (req: Request, res: Response): Promise<void> => {
  const { age, sortBy, sortOrder } = req.query;

  const options = {
    age: age ? parseInt(age as string, 10) : undefined,
    sortBy: sortBy as 'name' | 'age' | undefined,
    sortOrder: sortOrder as 'asc' | 'desc' | undefined,
  };

  const patients = await patientService.getAllPatients(options);
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
  const { id } = req.params;
  const patient = await patientService.getPatientById(id);
  if (!patient) {
    res.status(404).json({ message: 'Patient not found' });
    return;
  }
  const updatedPatient = await patientService.updatePatient(id, req.body);
  res.status(200).json(updatedPatient);
};

export const deletePatient = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const patient = await patientService.getPatientById(id);
  if (!patient) {
    res.status(404).json({ message: 'Patient not found' });
    return;
  }
  await patientService.deletePatient(id);
  res.status(204).send();
};
