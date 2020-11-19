import patientsData from '../../data/patients';
import { PatientsEntry, NonSensitivePatientEntry, NewPatientsEntry } from '../types';
import { v4 as uuidv4 } from 'uuid';

const patients: Array<PatientsEntry> = patientsData;

const getpatients = (): Array<PatientsEntry> => {
    return patients;
};

const getNonSensitivePatients = (): NonSensitivePatientEntry [] => {
    return patients.map(({ id, dateOfBirth, name, gender, occupation, entries }) => ({
        id,
        dateOfBirth,
        name,
        gender,
        occupation,
        entries
    })
  );
};

const getOneNonSensitivePatient = (id: string): NonSensitivePatientEntry | null => {
  const patient: PatientsEntry | undefined = patients.find(p => p.id == id);
  if(!patient) return null;
  const nonSensitivePatient: NonSensitivePatientEntry = {
    id: patient.id,
    dateOfBirth: patient.dateOfBirth,
    name: patient.name,
    gender: patient.gender,
    occupation: patient.occupation,
    entries: patient.entries
  };
  return nonSensitivePatient;
};

const addPatients = (entry: NewPatientsEntry): PatientsEntry => {
      const newPatientsEntry = {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call
        id: uuidv4().toString(),
        ...entry
      };

      //patientsData.push(newPatientsEntry);
      return newPatientsEntry;
};

export default {
    getpatients,
    getNonSensitivePatients,
    getOneNonSensitivePatient,
    addPatients
};