import express from 'express';
import patientsService from '../services/patientsService';
import { toNewPatientsEntry, toNewEntry } from '../utils';

const router = express.Router();

router.get('/', (_req, res) => {
    const patients = patientsService.getPatients();
    res.json(patients);
});

router.get('/:id', (req, res) => {
  //const patient = patientsService.getOneNonSensitivePatient(req.params.id);
  const patient = patientsService.getOnePatient(req.params.id);
  if(!patient) res.status(400).send({ error: 'could not find patient...' });
  res.json(patient);
});

router.post('/', (req, res) => {
    try {
        const newPatientsEntry = toNewPatientsEntry(req.body);
        const addedEntry = patientsService.addPatients(newPatientsEntry);    
        res.json(addedEntry);
      } catch (e) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        res.status(400).send(e.message);
      }
});

router.post('/:id/entries', (req, res) => {
  try {
        const newEntry = toNewEntry(req.body);
        //const updatedPatient = patientsService.addEntryToPatient(req.params.id, newEntry);
        res.json(newEntry);
    } catch (e) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      res.status(400).send(e.message);
    }
});

export default router;