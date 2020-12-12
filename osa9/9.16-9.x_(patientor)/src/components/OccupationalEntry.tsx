import React from 'react';
import { Icon } from 'semantic-ui-react';
import { useStateValue } from '../state';

interface OccupationalEntryProps {
    id: string;
    date: string;
    description: string;
    employerName: string;
    diagnosisCodes: Array<string> | undefined;
}

const OccupationalEntry: React.FC<OccupationalEntryProps> = (props) => {
    const [{ diagnoses },] = useStateValue();

    return (
      <div key={props.id}>
            <h4>{props.date} <Icon name='stethoscope' /> {props.employerName}</h4>
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

export default OccupationalEntry;