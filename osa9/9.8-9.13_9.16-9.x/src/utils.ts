/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { NewPatientsEntry, Gender, Entry, HealthCheckRating } from './types';
import { v4 as uuidv4 } from 'uuid';

export const toNewPatientsEntry = (object: any): NewPatientsEntry => {
    const newEntry: NewPatientsEntry = {
        name: parseString(object.name),
        dateOfBirth: parseDate(object.dateOfBirth),
        ssn: parseString(object.ssn),
        gender: parseGender(object.gender),
        occupation: parseString(object.occupation),
        entries: [] as Array<Entry>
    };
    console.log(object);
    return newEntry;
};

// making this was rather grueling...
export const toNewEntry = (object: any): Entry => {
    let obj: Entry;
    if(!object.type) throw new Error('Incorrect or missing type');
    switch (object.type){
        case "HealthCheck":
            obj = {
                id: uuidv4().toString(),
                description: parseString(object.description),
                date: parseDate(object.date),
                specialist: parseString(object.specialist),
                type: "HealthCheck",
                healthCheckRating: parseHealthCheckRating(object.healthCheckRating),
            };
            break;
        case "Hospital":
            obj = {
                id: uuidv4().toString(),
                description: parseString(object.description),
                date: parseDate(object.date),
                specialist: parseString(object.specialist),
                type: "Hospital"
            };
            break;
        case "OccupationalHealthcare":
            obj = {
                id: uuidv4().toString(),
                description: parseString(object.description),
                date: parseDate(object.date),
                specialist: parseString(object.specialist),
                type: "OccupationalHealthcare",
                employerName: parseString(object.employerName)
            };
            break;
        default:
            throw new Error(
                `Unhandled discriminated union member: ${JSON.stringify(object)}`
              );
        }
    if(object.diagnosisCodes) obj.diagnosisCodes = parseArray(object.diagnosisCodes);
    return obj;
};

const isString = (text: any): text is string => {
    return typeof text === 'string' || text instanceof String;
};

const isNumber = (num: any): num is number => {
    return typeof num === 'number' || !isNaN(num);
};

const isDate = (date: any): boolean => {
    return Boolean(Date.parse(date));
};

const isGender = (param: any): boolean => {
    return Object.values(Gender).includes(param);
};

const isArray = <T>(arg: Iterable<T>): arg is T[] => {
    return Array.isArray(arg);
};

const isHealthcheckRating = (param: any): boolean => {
    return Object.values(HealthCheckRating).includes(param);
};

const parseDate = (date: any): string => {
    if (!date || !isString(date) || !isDate(date)) throw new Error('Incorrect or missing date');
    return date;
};

const parseString = (str: any): string => {
    if (!str || !isString(str)) throw new Error('Incorrect or missing string');
    return str;
};

const parseGender = (gender: any): string => {
    if (!gender || !isString(gender) || !isGender(gender)) throw new Error('Incorrect or missing gender');
    return gender;
};

const parseHealthCheckRating = (healthCheckRating: any): number => {
    if (!isNumber(healthCheckRating) || !isHealthcheckRating(healthCheckRating)) throw new Error('Incorrect or missing health check rating');
    return healthCheckRating;
};

const parseArray = <T>(arr: Array<T>): T[] => {
    if(!arr || !isArray<T>(arr)) throw new Error('Incorrect or missing array');
    return arr;
};