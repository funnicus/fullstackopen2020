import React from 'react';
import { Entry } from '../types';

import HospitalEntry from './HospitalEntry';
import OccupationalEntry from './OccupationalEntry';
import HealthCheckEntry from './HealthCheckEntry';

type EntryProps = {
    entry: Entry;
};

/**
 * Helper function for exhaustive type checking
 */
const assertNever = (value: never): never => {
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
  };

const EntryDetails = ({ entry }: EntryProps) => {
    switch (entry.type){
        case "HealthCheck":
            return <HealthCheckEntry 
                    id={entry.id} 
                    date={entry.date} 
                    description={entry.description} 
                    healthCheckRating={entry.healthCheckRating} 
                    diagnosisCodes={entry.diagnosisCodes}
                    />;
        case "Hospital":
            return <HospitalEntry
                    id={entry.id} 
                    date={entry.date} 
                    description={entry.description} 
                    diagnosisCodes={entry.diagnosisCodes}
                    />;
        case "OccupationalHealthcare":
            return <OccupationalEntry 
                    id={entry.id} 
                    date={entry.date} 
                    description={entry.description} 
                    employerName={entry.employerName}
                    diagnosisCodes={entry.diagnosisCodes}
                    />;
        default:
            return assertNever(entry);
    }
};

export default EntryDetails;