"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = require("uuid");
const patients_full_1 = __importDefault(require("../../data/patients-full"));
const getNonSensitivePatients = () => {
    return patients_full_1.default.map(({ id, name, dateOfBirth, gender, occupation }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation
    }));
};
const addPatient = (patient) => {
    const id = (0, uuid_1.v1)();
    const newPatient = Object.assign({ id }, patient);
    patients_full_1.default.push(newPatient);
    return newPatient;
};
const findById = (id) => {
    const foundPatient = patients_full_1.default.find(p => p.id === id);
    return foundPatient;
};
const addEntry = (entry, id) => {
    const entry_id = (0, uuid_1.v1)();
    const patient = patients_full_1.default.find(p => p.id === id);
    if (patient) {
        if (patient.entries) {
            const modifiedPatient = Object.assign(Object.assign({}, patient), { entries: [
                    ...patient.entries,
                    Object.assign({ id: entry_id }, entry)
                ] });
            patients_full_1.default.forEach((pat, index) => {
                if (pat.id === modifiedPatient.id) {
                    patients_full_1.default[index] = modifiedPatient;
                }
            });
            return modifiedPatient;
        }
        else {
            const modifiedPatient = Object.assign(Object.assign({}, patient), { entries: [
                    Object.assign({ id: entry_id }, entry)
                ] });
            patients_full_1.default.forEach((pat, index) => {
                if (pat.id === modifiedPatient.id) {
                    patients_full_1.default[index] = modifiedPatient;
                }
            });
            return modifiedPatient;
        }
    }
    throw new Error('Patient not found for which new entry was made.');
};
exports.default = {
    getNonSensitivePatients,
    addPatient,
    findById,
    addEntry
};
