import { NewPatient, Gender, Diagnosis, EntryWithoutId, HealthCheckRating } from "./types";

const isString = (text: unknown): text is string => {
    return typeof text === 'string' || text instanceof String;
};

const parseName = (name: unknown): string => {
    if (!isString(name)){
        throw new Error('Incorrect or missing name');
    }

    return name;
};

const isDate = (date: string): boolean => {
    return Boolean(Date.parse(date));
};

const parseDateOfBirth = (dateOfBirth: unknown): string => {
    if (!isString(dateOfBirth) || !isDate(dateOfBirth)){
        throw new Error('Incorrect or missing date of birth: ' + dateOfBirth);
    }
    return dateOfBirth;
};

const isGender = (param: string): param is Gender => {
    return Object.values(Gender).map(g => g.toString()).includes(param);
};

const parseGender = (gender: unknown): Gender => {
    if (!isString(gender) || !isGender(gender)){
        throw new Error('Incorrect or missing gender: ' + gender);
    }
    return gender;
};

const parseOccupation = (occupation: unknown): string => {
    if (!isString(occupation)){
        throw new Error('Incorrect or missing occupation');
    }
    return occupation;
};

const parseSsn = (ssn: unknown): string => {
    if (!isString(ssn)){
        throw new Error('Incorrect or missing ssn');
    }
    return ssn;
};

const toNewPatient = (object: unknown): NewPatient => {
    if (!object || typeof object !== 'object'){
        throw new Error('Incorrect or missing data');
    }

    if ('name' in object && 'dateOfBirth' in object && 'gender' in object && 'occupation' in object && 'ssn' in object){
        const newPatient: NewPatient = {
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

const parseDescription = (description: unknown): string => {
    if (!isString(description)){
        throw new Error('Incorrect description: ' + description);
    }
    return description;
};

const parseDate = (date: unknown): string => {
    if (!isString(date) || !isDate(date)){
        throw new Error('Incorrect date: ' + date);
    }
    return date;
};

const parseSpecialist = (specialist: unknown): string => {
    if (!isString(specialist)){
        throw new Error('Incorrect specialist: ' + specialist);
    }
    return specialist;
};

const parseDischarge = (discharge: unknown): { date: string, criteria: string } => {
    if (!discharge || typeof discharge !== 'object'){
        throw new Error('Incorrect or missing discharge');
    }
    if ('date' in discharge && 'criteria' in discharge){
        if (!isString(discharge.date) || !isDate(discharge.date)){
            throw new Error('Incorrect or missing discharge date: ' + discharge.date);
        }
        if (!isString(discharge.criteria)){
            throw new Error('Incorrect or missing discharge criteria');
        }
        return { date: discharge.date, criteria: discharge.criteria };
    }
    throw new Error('Incorrect or missing discharge');
};

const parseSickLeave = (sickLeave: unknown): { startDate: string,
    endDate: string } => {
    if (!sickLeave || typeof sickLeave !== 'object'){
        throw new Error('Incorrect or missing sick leave');
    }
    if ('startDate' in sickLeave && 'endDate' in sickLeave){
        if (!isString(sickLeave.startDate) || !isDate(sickLeave.startDate)){
            throw new Error('Incorrect or missing sick leave start date: ' + sickLeave.startDate);
        }
        if (!isString(sickLeave.endDate) || !isDate(sickLeave.endDate)){
            throw new Error('Incorrect or missing sick leave end date: ' + sickLeave.endDate);
        }
        return { startDate: sickLeave.startDate, endDate: sickLeave.endDate };
    }
    throw new Error('Incorrect or missing sick leave');
};

const parseDiagnosisCodes = (object: unknown): Array<Diagnosis['code']> => {
    if (!object || typeof object !== 'object' || !('diagnosisCodes' in object)) {
        return [] as Array<Diagnosis['code']>;
    }
    return object.diagnosisCodes as Array<Diagnosis['code']>;
};

const parseEmployerName = (employerName: unknown): string => {
    if (!isString(employerName)){
        throw new Error('Incorrect or missing employerName');
    }
    return employerName;
};

const isHealthCheckRating = (param: number): param is HealthCheckRating => {
    return Object.values(HealthCheckRating).includes(param);
};

const parseHealthCheckRating = (healthCheckRating: unknown): HealthCheckRating => {
    if (isNaN(Number(healthCheckRating)) || !isHealthCheckRating(Number(healthCheckRating))){
        throw new Error('Incorrect value of healthCheckRating: ' + healthCheckRating);
    }
    return Number(healthCheckRating);
};

export const toNewEntry = (object: unknown): EntryWithoutId => {
    if (!object || typeof object !== 'object'){
        throw new Error('Incorrect or missing data');
    }

    if ('description' in object && 'date' in object && 'specialist' in object && 'type' in object){
        switch (object.type) {
            case "Hospital":
                if ('discharge' in object){
                    let newEntry: EntryWithoutId = {
                        description: parseDescription(object.description),
                        date: parseDate(object.date),
                        specialist: parseSpecialist(object.specialist),
                        type: object.type,
                        discharge: parseDischarge(object.discharge)
                    };
                    if ('diagnosisCodes' in object){
                        const diagnosisCodes = parseDiagnosisCodes(object);
                        newEntry = { ...newEntry, diagnosisCodes };
                    }
                    return newEntry;
                }
                throw new Error('Incorrect data: some fields are missing');
            case "OccupationalHealthcare":
                if ('employerName' in object){
                    let newEntry: EntryWithoutId = {
                        description: parseDescription(object.description),
                        date: parseDate(object.date),
                        specialist: parseSpecialist(object.specialist),
                        type: object.type,
                        employerName: parseEmployerName(object.employerName)
                    };
                    if ('sickLeave' in object){
                        const sickLeave = parseSickLeave(object.sickLeave);
                        newEntry = { ...newEntry, sickLeave };
                    }
                    if ('diagnosisCodes' in object){
                        const diagnosisCodes = parseDiagnosisCodes(object);
                        newEntry = { ...newEntry, diagnosisCodes };
                    }
                    return newEntry;
                }
                throw new Error('Incorrect data: some fields are missing');


            case "HealthCheck":
                if ('healthCheckRating' in object){
                    let newEntry: EntryWithoutId = {
                        description: parseDescription(object.description),
                        date: parseDate(object.date),
                        specialist: parseSpecialist(object.specialist),
                        type: object.type,
                        healthCheckRating: parseHealthCheckRating(object.healthCheckRating)
                    };
                    if ('diagnosisCodes' in object){
                        const diagnosisCodes = parseDiagnosisCodes(object);
                        newEntry = { ...newEntry, diagnosisCodes };
                    }
                    return newEntry;
                }
                throw new Error('Incorrect data: some fields are missing');
            default:
                throw new Error(
                    `Unhandled discriminated entry type: ${JSON.stringify(object)}`
                );
        }
    }
    throw new Error('Incorrect data: some fields are missing');    
};

export default toNewPatient;