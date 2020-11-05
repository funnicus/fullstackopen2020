/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { NewPatientsEntry, Gender } from './types';

export const toNewPatientsEntry = (object: any): NewPatientsEntry => {
    const newEntry: NewPatientsEntry = {
        name: parseString(object.name),
        dateOfBirth: parseDate(object.dateOfBirth),
        ssn: parseString(object.ssn),
        gender: parseGender(object.gender),
        occupation: parseString(object.occupation)
    };
    console.log(object);
    return newEntry;
};

const isString = (text: any): text is string => {
    return typeof text === 'string' || text instanceof String;
};

const isDate = (date: any): boolean => {
    return Boolean(Date.parse(date));
};

const isGender = (param: any): boolean => {
    return Object.values(Gender).includes(param);
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