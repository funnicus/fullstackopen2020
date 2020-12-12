import patientsData from '../../data/patients';
import { PatientsEntry, NonSensitivePatientEntry, NewPatientsEntry, Entry } from '../types';
import { v4 as uuidv4 } from 'uuid';

const patients: Array<PatientsEntry> = patientsData;

const getPatients = (): Array<PatientsEntry> => {
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

const getOnePatient = (id: string): PatientsEntry | null => {
  const patient: PatientsEntry | undefined = patients.find(p => p.id == id);
  if(!patient) return null;
  return patient;
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

const addEntryToPatient = (id: string, entry: Entry): PatientsEntry | null => {
  const patient: PatientsEntry | undefined = patients.find(p => p.id == id);
  if(!patient) return null;
  const newPatient = { ...patient, entries: patient.entries.concat(entry) };
  return newPatient;
};

export default {
    getPatients,
    getOnePatient,
    getNonSensitivePatients,
    getOneNonSensitivePatient,
    addPatients,
    addEntryToPatient
};