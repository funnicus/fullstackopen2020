import { State } from "./state";
import { Patient, Diagnosis, Entry } from "../types";

interface AddEntryPayload {
  entry: Entry;
  id: string;
}

export type Action =
  | {
      type: "SET_PATIENT_LIST";
      payload: Patient[];
    }
  | {
      type: "ADD_PATIENT";
      payload: Patient;
    }
  |
    {
      type: "SET_DIAGNOSES_LIST";
      payload: Diagnosis[];
    }
  |
    {
      type: "ADD_DIAGNOSIS";
      payload: Diagnosis;
    }
  |
    {
      type: "ADD_Entry";
      payload: AddEntryPayload;
    };

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_PATIENT_LIST":
      return {
        ...state,
        patients: {
          ...action.payload.reduce(
            (memo, patient) => ({ ...memo, [patient.id]: patient }),
            {}
          ),
          ...state.patients
        }
      };
    case "ADD_PATIENT":
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload
        }
      };
    case "SET_DIAGNOSES_LIST":
      return {
        ...state,
        diagnoses: [
          ...action.payload
        ]
      };
    case "ADD_DIAGNOSIS":
      return {
        ...state,
        diagnoses: [
          ...state.diagnoses,
          action.payload
        ]
      };
    case "ADD_Entry":
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: {
            ...state.patients[action.payload.id],
            entries:  state.patients[action.payload.id].entries.concat(action.payload.entry)
          }
        }
      };
    default:
      return state;
  }
};

export const setPatientList = (patientList: Patient[]): Action => {
  return {
    type: "SET_PATIENT_LIST", 
    payload: patientList
  };
};

export const addPatient = (patient: Patient): Action => {
  return {
    type: "ADD_PATIENT",
    payload: patient
  };
};

export const setDiagnosesList = (diagnosesList: Diagnosis[]): Action => {
  return {
    type: "SET_DIAGNOSES_LIST",
    payload: diagnosesList
  };
};

export const addDiagnosis = (diagnosis: Diagnosis): Action => {
  return {
    type: "ADD_DIAGNOSIS",
    payload: diagnosis
  };
};

export const addEntry = (entry: Entry, id: string): Action => {
  return {
    type: "ADD_Entry",
    payload: { entry, id }
  };
};