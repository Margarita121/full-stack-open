import express from 'express';
import { Response } from 'express';
import { NonSensitivePatient } from "../types";
import patientsService from '../services/patientsService';

const router = express.Router();

router.get('/', (_req, res: Response<NonSensitivePatient[]>) => {
  res.send(patientsService.getNonSensitivePatient());
});

export default router;