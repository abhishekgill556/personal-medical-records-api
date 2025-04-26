import { Request, Response } from 'express';
import * as doctorService from '../services/doctor.service';

export const getAllDoctors = async (_req: Request, res: Response): Promise<void> => {
  const doctors = await doctorService.getAllDoctors();
  res.status(200).json(doctors);
};

export const getDoctorById = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const doctor = await doctorService.getDoctorById(id);
  if (!doctor) {
    res.status(404).json({ message: 'Doctor not found' });
    return;
  }
  res.status(200).json(doctor);
};

export const createDoctor = async (req: Request, res: Response): Promise<void> => {
  const newDoctor = await doctorService.createDoctor(req.body);
  res.status(201).json(newDoctor);
};

export const updateDoctor = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const doctor = await doctorService.getDoctorById(id);
  if (!doctor) {
    res.status(404).json({ message: 'Doctor not found' });
    return;
  }
  const updated = await doctorService.updateDoctor(id, req.body);
  res.status(200).json(updated);
};

export const deleteDoctor = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const doctor = await doctorService.getDoctorById(id);
  if (!doctor) {
    res.status(404).json({ message: 'Doctor not found' });
    return;
  }
  await doctorService.deleteDoctor(id);
  res.status(204).send();
};
