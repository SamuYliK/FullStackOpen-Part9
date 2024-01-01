import diagnoseData from '../../data/diagnoses';

import { Diagnosis } from '../types';

const getDiagnoses = (): Diagnosis[] => {
    return diagnoseData;
};

const addDiagnose = () => {
    return null;
};

export default {
    getDiagnoses,
    addDiagnose
};