import express from 'express';
const bmi_app = express();
const exercise_app = express();

exercise_app.use(express.json());

import { calculateBMI } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';

bmi_app.get('/', (_req, res) => {
    res.send('Hello Full Stack!');
});

bmi_app.get('/bmi', (_req, res) => {
    const height = Number(_req.query.height);
    const weight = Number(_req.query.weight);
    if (!height || !weight){
        res.send({
            error: "malformatted parameters"
        });
    }
    const bmi = calculateBMI(height, weight);
    res.send({
        weight,
        height,
        bmi
    });
});

exercise_app.post('/exercises', (req, res) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    if (!req.body.target || !req.body.daily_exercises){
        res.send({
            error: "parameters missing"
        });
    }
    
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    const target = Number(req.body.target);

    if (!target){
        res.send({
            error: "malformatted parameters"
        });
    }

    /* eslint-disable @typescript-eslint/no-unsafe-member-access */
    if(!Array.isArray(req.body.daily_exercises)){
        res.send({
            error: "parameters missing"
        });
    }

    if (req.body.daily_exercises.length === 0){
        res.send({
            error: "parameters missing"
        });
    }

    const exHours: number[] = [];

    for (let step: number = 0; step < req.body.daily_exercises.length; step++){
        if (isNaN(Number(req.body.daily_exercises[step]))) {
            res.send({
                error: "malformatted parameters"
            });
        }
        exHours.push(Number(req.body.daily_exercises[step]));
    }
    /* eslint-enable @typescript-eslint/no-unsafe-member-access */

    const result = calculateExercises(target, exHours);
    return res.send(result);
});

const BMI_PORT = 3003;
const EXERCISE_PORT = 3002;

bmi_app.listen(BMI_PORT, () => {
    console.log(`Server running on port ${BMI_PORT}`);
});

exercise_app.listen(EXERCISE_PORT, () => {
    console.log(`Server running on port ${EXERCISE_PORT}`);
});