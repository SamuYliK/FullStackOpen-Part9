"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toNewEntry = void 0;
const types_1 = require("./types");
const isString = (text) => {
    return typeof text === 'string' || text instanceof String;
};
const parseName = (name) => {
    if (!isString(name)) {
        throw new Error('Incorrect or missing name');
    }
    return name;
};
const isDate = (date) => {
    return Boolean(Date.parse(date));
};
const parseDateOfBirth = (dateOfBirth) => {
    if (!isString(dateOfBirth) || !isDate(dateOfBirth)) {
        throw new Error('Incorrect or missing date of birth: ' + dateOfBirth);
    }
    return dateOfBirth;
};
const isGender = (param) => {
    return Object.values(types_1.Gender).map(g => g.toString()).includes(param);
};
const parseGender = (gender) => {
    if (!isString(gender) || !isGender(gender)) {
        throw new Error('Incorrect or missing gender: ' + gender);
    }
    return gender;
};
const parseOccupation = (occupation) => {
    if (!isString(occupation)) {
        throw new Error('Incorrect or missing occupation');
    }
    return occupation;
};
const parseSsn = (ssn) => {
    if (!isString(ssn)) {
        throw new Error('Incorrect or missing ssn');
    }
    return ssn;
};
const toNewPatient = (object) => {
    if (!object || typeof object !== 'object') {
        throw new Error('Incorrect or missing data');
    }
    if ('name' in object && 'dateOfBirth' in object && 'gender' in object && 'occupation' in object && 'ssn' in object) {
        const newPatient = {
            name: parseName(object.name),
            dateOfBirth: parseDateOfBirth(object.dateOfBirth),
            gender: parseGender(object.gender),
            occupation: parseOccupation(object.occupation),
            ssn: parseSsn(object.ssn),
            entries: [],
        };
        return newPatient;
    }
    throw new Error('Incorrect data: some fields are missing');
};
// Below are checks for new entry for patient
const parseDescription = (description) => {
    if (!isString(description)) {
        throw new Error('Incorrect description: ' + description);
    }
    return description;
};
const parseDate = (date) => {
    if (!isString(date) || !isDate(date)) {
        throw new Error('Incorrect date: ' + date);
    }
    return date;
};
const parseSpecialist = (specialist) => {
    if (!isString(specialist)) {
        throw new Error('Incorrect specialist: ' + specialist);
    }
    return specialist;
};
const parseDischarge = (discharge) => {
    if (!discharge || typeof discharge !== 'object') {
        throw new Error('Incorrect or missing discharge');
    }
    if ('date' in discharge && 'criteria' in discharge) {
        if (!isString(discharge.date) || !isDate(discharge.date)) {
            throw new Error('Incorrect or missing discharge date: ' + discharge.date);
        }
        if (!isString(discharge.criteria)) {
            throw new Error('Incorrect or missing discharge criteria');
        }
        return { date: discharge.date, criteria: discharge.criteria };
    }
    throw new Error('Incorrect or missing discharge');
};
const parseSickLeave = (sickLeave) => {
    if (!sickLeave || typeof sickLeave !== 'object') {
        throw new Error('Incorrect or missing sick leave');
    }
    if ('startDate' in sickLeave && 'endDate' in sickLeave) {
        if (!isString(sickLeave.startDate) || !isDate(sickLeave.startDate)) {
            throw new Error('Incorrect or missing sick leave start date: ' + sickLeave.startDate);
        }
        if (!isString(sickLeave.endDate) || !isDate(sickLeave.endDate)) {
            throw new Error('Incorrect or missing sick leave end date: ' + sickLeave.endDate);
        }
        return { startDate: sickLeave.startDate, endDate: sickLeave.endDate };
    }
    throw new Error('Incorrect or missing sick leave');
};
const parseDiagnosisCodes = (object) => {
    if (!object || typeof object !== 'object' || !('diagnosisCodes' in object)) {
        return [];
    }
    return object.diagnosisCodes;
};
const parseEmployerName = (employerName) => {
    if (!isString(employerName)) {
        throw new Error('Incorrect or missing employerName');
    }
    return employerName;
};
const isHealthCheckRating = (param) => {
    return Object.values(types_1.HealthCheckRating).includes(param);
};
const parseHealthCheckRating = (healthCheckRating) => {
    if (isNaN(Number(healthCheckRating)) || !isHealthCheckRating(Number(healthCheckRating))) {
        throw new Error('Incorrect value of healthCheckRating: ' + healthCheckRating);
    }
    return Number(healthCheckRating);
};
const toNewEntry = (object) => {
    if (!object || typeof object !== 'object') {
        throw new Error('Incorrect or missing data');
    }
    if ('description' in object && 'date' in object && 'specialist' in object && 'type' in object) {
        switch (object.type) {
            case "Hospital":
                if ('discharge' in object) {
                    let newEntry = {
                        description: parseDescription(object.description),
                        date: parseDate(object.date),
                        specialist: parseSpecialist(object.specialist),
                        type: object.type,
                        discharge: parseDischarge(object.discharge)
                    };
                    if ('diagnosisCodes' in object) {
                        const diagnosisCodes = parseDiagnosisCodes(object);
                        newEntry = Object.assign(Object.assign({}, newEntry), { diagnosisCodes });
                    }
                    return newEntry;
                }
                throw new Error('Incorrect data: some fields are missing');
            case "OccupationalHealthcare":
                if ('employerName' in object) {
                    let newEntry = {
                        description: parseDescription(object.description),
                        date: parseDate(object.date),
                        specialist: parseSpecialist(object.specialist),
                        type: object.type,
                        employerName: parseEmployerName(object.employerName)
                    };
                    if ('sickLeave' in object) {
                        const sickLeave = parseSickLeave(object.sickLeave);
                        newEntry = Object.assign(Object.assign({}, newEntry), { sickLeave });
                    }
                    if ('diagnosisCodes' in object) {
                        const diagnosisCodes = parseDiagnosisCodes(object);
                        newEntry = Object.assign(Object.assign({}, newEntry), { diagnosisCodes });
                    }
                    return newEntry;
                }
                throw new Error('Incorrect data: some fields are missing');
            case "HealthCheck":
                if ('healthCheckRating' in object) {
                    let newEntry = {
                        description: parseDescription(object.description),
                        date: parseDate(object.date),
                        specialist: parseSpecialist(object.specialist),
                        type: object.type,
                        healthCheckRating: parseHealthCheckRating(object.healthCheckRating)
                    };
                    if ('diagnosisCodes' in object) {
                        const diagnosisCodes = parseDiagnosisCodes(object);
                        newEntry = Object.assign(Object.assign({}, newEntry), { diagnosisCodes });
                    }
                    return newEntry;
                }
                throw new Error('Incorrect data: some fields are missing');
            default:
                throw new Error(`Unhandled discriminated entry type: ${JSON.stringify(object)}`);
        }
    }
    throw new Error('Incorrect data: some fields are missing');
};
exports.toNewEntry = toNewEntry;
exports.default = toNewPatient;
