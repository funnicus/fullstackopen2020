import React from 'react';
import axios from "axios";

import { Icon } from 'semantic-ui-react';
import { Patient, Entry } from '../types';

import EntryDetails from './EntryDetails';

import { apiBaseUrl } from "../constants";

import { addEntry } from '../state/reducer';
import { useStateValue } from '../state';

import AddEntryForm from './AddEntryForm';

type InfoProps = {
  patient: Patient;
};

export type EntryValues = Omit<Entry, "id">;

const PatientInfo = ({ patient }: InfoProps) => {
  const [, dispatch] = useStateValue();

  const submitNewEntry = async (values: EntryValues) => {
    try {
      const { data: newEntry } = await axios.post<Entry>(
        `${apiBaseUrl}/patients/${patient.id}/entries`,
        values
      );
      dispatch(addEntry(newEntry, patient.id));
    } catch (e) {
      console.error(e.response.data);
    }
  };

  return (
    <div className="patient-card">
      <h2>{patient.name} <Icon name={patient.gender === 'female' ? 'venus': 'mars'} size='big' /></h2>
      <p>ssn: {patient.ssn}</p>
      <p>occupation {patient.occupation}</p>
      <h3>entries</h3>
      {patient.entries.map(e => <EntryDetails key={e.id} entry={e} />)}
      <h3>Add entry</h3>
      <AddEntryForm onSubmit={submitNewEntry} />
    </div>
  );
};

export default PatientInfo;