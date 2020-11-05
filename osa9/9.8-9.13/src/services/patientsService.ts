import patientsData from '../../data/patients.json';
import { PatientsEntry, NonSensitivePatientEntry, NewPatientsEntry } from '../types';
import { v4 as uuidv4 } from 'uuid';

const patients: Array<PatientsEntry> = patientsData;

const getpatients = (): Array<PatientsEntry> => {
    return patients;
};

const getNonSensitivePatients = (): NonSensitivePatientEntry [] => {
    return patients.map(({ id, dateOfBirth, name, gender, occupation }) => ({
        id,
        dateOfBirth,
        name,
        gender,
        occupation
    })
  );
};

const addPatients = (entry: NewPatientsEntry): PatientsEntry => {
      const newPatientsEntry = {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call
        id: uuidv4().toString(),
        ...entry
      };

      patientsData.push(newPatientsEntry);
      return newPatientsEntry;
};

export default {
    getpatients,
    getNonSensitivePatients,
    addPatients
};