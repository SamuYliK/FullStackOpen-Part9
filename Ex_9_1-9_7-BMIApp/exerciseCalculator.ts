interface ResultValues {
    periodLength: number;
    trainingDays: number;
    success: boolean;
    rating: number;
    ratingDescription: string;
    target: number;
    average: number;
}

interface ExerciseValues {
    value1: number;
    value2: number[];
}

const exercisesParseArguments = (args: string[]): ExerciseValues => {
    if (args.length < 4) throw new Error('Not enough arguments');
    
    if (!isNaN(Number(args[2]))){
        const trainDayList: number[] = [];
        args.forEach((item, index) => {
            if ( index > 2){
                if (!isNaN(Number(item))) {
                    trainDayList.push(Number(item));
                } else {
                    throw new Error('Provided values were not numbers!');
                }  
            }
        });
        return {
            value1: Number(args[2]),
            value2: trainDayList
        };
    } else {
        throw new Error('Provided target value is not number!');
    }
};

export const calculateExercises = (target: number, exHours: number[]): ResultValues => {
    const periodLength = exHours.length;
    const trainingDays = exHours.filter(a => a > 0).length;
    const trainingHours = exHours.filter(a => a > 0).reduce((accumulator, currentValue) => {
        return accumulator+currentValue;
    }, 0);
    const average = trainingHours/periodLength;
    const success = average >= target;

    const calculateRating = (target: number, average: number): number => {
        if (average < 0.85*target){
            return 1;
        } else if ( average >= 0.85*target && average < target){
            return 2;
        } else{
            return 3;
        }
    };
    const rating = calculateRating(target, average);

    const defineRating = (rating: number): string => {
        if (rating === 1){
            return 'You missed your target by quite much. Try to exercise more to improve your health.';
        } else if (rating === 2){
            return 'You exercised close to your target, but there is always room for improvement';
        } else if (rating ===3){
            return 'Great job! You have exercised a lot, so remember to rest also.';
        } else {
            return 'Rating could not be defined for some reason.';
        }
    };
    const ratingDescription = defineRating(rating);
    return {
        periodLength,
        trainingDays,
        success,
        rating,
        ratingDescription,
        target,
        average
    };
};

try {
    const { value1, value2 } = exercisesParseArguments(process.argv);
    console.log(calculateExercises(value1, value2));
} catch (error: unknown) {
    let errorMessage = 'Something bad happened.';
    if (error instanceof Error){
        errorMessage += ' Error: ' + error.message;
    }
    console.log(errorMessage);
}