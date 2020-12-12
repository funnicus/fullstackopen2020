import React from 'react';
import { Icon } from 'semantic-ui-react';
import { useStateValue } from '../state';

interface HospitalEntryProps {
    id: string;
    date: string;
    description: string;
    diagnosisCodes: Array<string> | undefined;
}

const HospitalEntry: React.FC<HospitalEntryProps> = (props) => {

  const [{ diagnoses },] = useStateValue();

  return (
    <div key={props.id}>
          <h4>{props.date} <Icon name='hospital' /></h4>
          <p>{props.description}</p>
          <ul>
            {props.diagnosisCodes?.map(d => {
              const diagnosisObj = diagnoses.find(diagnosis => diagnosis.code === d);
              return (<li key={d}>{d} {diagnosisObj?.name}</li>);
            })}
          </ul>
        </div>
  );
};

export default HospitalEntry;