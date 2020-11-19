import express from 'express';
import patientsService from '../services/patientsService';
import { toNewPatientsEntry } from '../utils';

const router = express.Router();

router.get('/', (_req, res) => {
    const patients = patientsService.getNonSensitivePatients();
    res.json(patients);
});

router.get('/:id', (req, res) => {
  const patient = patientsService.getOneNonSensitivePatient(req.params.id);
  if(!patient) res.status(400).send({ error: 'could not find patient...' });
  res.json(patient);
});

router.post('/', (req, res) => {
    try {
        const newPatientsEntry = toNewPatientsEntry(req.body);
        const addedEntry = patientsService.addPatients(newPatientsEntry);    
        res.json(addedEntry);
      } catch (e) {
        res.status(400).send(e.message);
      }
});

export default router;