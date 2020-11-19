"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const patients_json_1 = __importDefault(require("../../data/patients.json"));
const uuid_1 = require("uuid");
const patients = patients_json_1.default;
const getpatients = () => {
    return patients;
};
const getNonSensitivePatients = () => {
    return patients.map(({ id, dateOfBirth, name, gender, occupation }) => ({
        id,
        dateOfBirth,
        name,
        gender,
        occupation
    }));
};
const addPatients = (entry) => {
    const newPatientsEntry = Object.assign({ 
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call
        id: uuid_1.v4().toString() }, entry);
    patients_json_1.default.push(newPatientsEntry);
    return newPatientsEntry;
};
exports.default = {
    getpatients,
    getNonSensitivePatients,
    addPatients
};
