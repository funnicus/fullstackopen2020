"use strict";
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
Object.defineProperty(exports, "__esModule", { value: true });
exports.toNewPatientsEntry = void 0;
const types_1 = require("./types");
exports.toNewPatientsEntry = (object) => {
    const newEntry = {
        name: parseString(object.name),
        dateOfBirth: parseDate(object.dateOfBirth),
        ssn: parseString(object.ssn),
        gender: parseGender(object.gender),
        occupation: parseString(object.occupation)
    };
    console.log(object);
    return newEntry;
};
const isString = (text) => {
    return typeof text === 'string' || text instanceof String;
};
const isDate = (date) => {
    return Boolean(Date.parse(date));
};
const isGender = (param) => {
    return Object.values(types_1.Gender).includes(param);
};
const parseDate = (date) => {
    if (!date || !isString(date) || !isDate(date))
        throw new Error('Incorrect or missing date');
    return date;
};
const parseString = (str) => {
    if (!str || !isString(str))
        throw new Error('Incorrect or missing string');
    return str;
};
const parseGender = (gender) => {
    if (!gender || !isString(gender) || !isGender(gender))
        throw new Error('Incorrect or missing gender');
    return gender;
};
