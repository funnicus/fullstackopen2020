import React from 'react';
import { Icon } from 'semantic-ui-react';
import { useStateValue } from '../state';
import { HealthCheckRating } from '../types';

interface HealthCheckEntryProps {
    id: string;
    date: string;
    description: string;
    healthCheckRating: HealthCheckRating;
    diagnosisCodes: Array<string> | undefined;
}

const HealthCheckEntry: React.FC<HealthCheckEntryProps> = (props) => {

  const [{ diagnoses },] = useStateValue();

  const heartColor = () => {
      if(props.healthCheckRating < 1) return <Icon name='heart' color="green" />;
      else if(props.healthCheckRating < 2) return <Icon name='heart' color="yellow" />;
      else if(props.healthCheckRating < 3) return <Icon name='heart' color="orange" />;
      else return <Icon name='heart' color="red" />;
  };

  return (
    <div key={props.id}>
          <h4>{props.date} <Icon name='doctor' /></h4>
          <p>{props.description}</p>
          <p>{props.healthCheckRating}  {heartColor()}</p>
          <ul>
            {props.diagnosisCodes?.map(d => {
              const diagnosisObj = diagnoses.find(diagnosis => diagnosis.code === d);
              return (<li key={d}>{d} {diagnosisObj?.name}</li>);
            })}
          </ul>
        </div>
  );
};

export default HealthCheckEntry;