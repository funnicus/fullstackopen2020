import React from "react";
import { Button } from "semantic-ui-react";

import EntryForm from './EntryForm';

import { EntryValues } from './PatientInfo';

interface Props {
  onSubmit: (values: EntryValues) => void;
}

const AddEntryForm: React.FC<Props> = ({ onSubmit }) => {
    const [modalOpen, setModalOpen] = React.useState<boolean>(false);
    const [entryType, setEntryType] = React.useState<string>("Hospital");

    const openModal = (type: string): void => {
      setModalOpen(true);
      setEntryType(type);
    };

    const closeModal = (): void => {
      setModalOpen(false);
    }; 

        return (
          <div>
            <EntryForm modalOpen={modalOpen} onClose={closeModal} onSubmit={onSubmit} entryType={entryType} />
            <Button onClick={() => openModal("HealthCheck")}>Add New Healthcheck Entry</Button>
            <Button onClick={() => openModal("Hospital")}>Add New Hospital Entry</Button>
            <Button onClick={() => openModal("OccupationalHealthcare")}>Add New Occupational Entry</Button>
          </div>
      );
  };

export default AddEntryForm;
