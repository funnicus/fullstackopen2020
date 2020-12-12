import React from 'react';
import { Modal } from 'semantic-ui-react';

import { useStateValue } from '../../state';

import AddHealthcheckEntry from './AddHealthcheckEntry';
import AddHospitalEntry from './AddHospitalEntry';
import AddOccupationalEntry from './AddOccupationalEntry';

import { EntryValues } from '../PatientInfo';
import { Diagnosis } from '../../types';

interface EntryFormProps {
  modalOpen: boolean;
  onClose: () => void;
  onSubmit: (values: EntryValues) => void;
  entryType: string;
}

const returnForm = (type: string, onSubmit: (values: EntryValues) => void, diagnoses: Diagnosis[]) => {
    switch(type){
        case "HealthCheck":
            return(
            <AddHealthcheckEntry
            onSubmit={onSubmit}
            diagnoses={diagnoses}
            />
            );
        case "Hospital":
            return (
            <AddHospitalEntry
            onSubmit={onSubmit}
            diagnoses={diagnoses}
            />
            );
        case "OccupationalHealthcare":
            return (
                <AddOccupationalEntry
                onSubmit={onSubmit}
                diagnoses={diagnoses}
                />
                );
        default:
            return <div>No such form...</div>;
    }
}

const EntryForm = ({ modalOpen, onClose, onSubmit, entryType }: EntryFormProps) => {
const [{ diagnoses }] = useStateValue();
console.log(entryType);
return (
  <Modal open={modalOpen} onClose={onClose} centered={false} closeIcon>
    <Modal.Header>Add a new entry</Modal.Header>
    <Modal.Content>
        {returnForm(entryType, onSubmit, diagnoses)}
    </Modal.Content>
  </Modal>
);
};

export default EntryForm;