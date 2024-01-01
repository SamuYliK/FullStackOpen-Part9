import { v1 as uuid } from 'uuid';
import patientData from '../../data/patients-full';
import { NonSensitivePatient, Patient, NewPatient, EntryWithoutId } from '../types';

const getNonSensitivePatients = (): NonSensitivePatient[] => {
    return patientData.map(({ id, name, dateOfBirth, gender, occupation }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation
    }));
};

const addPatient = ( patient: NewPatient ): Patient => {
    const id: string = uuid();
    const newPatient = {
        id,
        ...patient
    };
    patientData.push(newPatient);
    return newPatient;
};

const findById = (id: string): Patient | undefined => {
    const foundPatient = patientData.find(p => p.id === id);
    return foundPatient;
};

const addEntry = ( entry: EntryWithoutId, id: string ): Patient => {
    const entry_id: string = uuid();
    const patient = patientData.find(p => p.id === id);
    if (patient){
        if (patient.entries){
            const modifiedPatient = {
                ...patient,
                entries: [
                    ...patient.entries,
                    {
                        id: entry_id,
                        ...entry
                    }
                ]
            };
            patientData.forEach((pat, index) => {
                if (pat.id === modifiedPatient.id){
                    patientData[index] = modifiedPatient;
                }
            });
            return modifiedPatient;
        } else {
            const modifiedPatient = {
                ...patient,
                entries: [
                    {
                        id: entry_id,
                        ...entry
                    }
                ]
            };
            patientData.forEach((pat, index) => {
                if (pat.id === modifiedPatient.id){
                    patientData[index] = modifiedPatient;
                }
            });
            return modifiedPatient;
        }        
    }
    throw new Error('Patient not found for which new entry was made.');
};

export default {
    getNonSensitivePatients,
    addPatient,
    findById,
    addEntry
};