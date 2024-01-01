interface BMIValues {
    value1: number;
    value2: number;
}

const parseArguments = (args: string[]): BMIValues => {
    if (args.length < 4)  throw new Error('Not enough arguments');
    if (args.length > 4) throw new Error ('Too many arguments');

    if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))){
        if (Number(args[3]) === 0){
            throw new Error('Weight cannot be zero!');
        } else {
            return {
                value1: Number(args[2]),
                value2: Number(args[3])
            };
        }
    } else {
        throw new Error('Provided values were not numbers!');
    }
};

export const calculateBMI = (height: number, weight: number): string => {
    const BMI = weight/((height/100)*(height/100));
    if (BMI < 16.0){
        return 'Underweight (Severe thinness)';
    } else if (BMI >= 16.0 && BMI < 17.0){
        return 'Underweight (Moderate thinness)';
    } else if (BMI >= 17.0 && BMI < 18.5){
        return 'Underweight (Mild thinness)';
    } else if (BMI >= 18.5 && BMI < 25.0){
        return 'Normal (healthy weight)'; 
    } else if (BMI >= 25.0 && BMI < 30.0){
        return 'Overweight (Pre-obese)';
    } else if (BMI >= 30.0 && BMI < 35.0){
        return 'Obese (Class I)';
    } else if (BMI >= 35.0 && BMI < 40.0){
        return 'Obese (Class II)';
    } else if (BMI >= 40.0){
        return 'Obese (Class III)';
    } else {
        return 'BMI calculation went wrong...';
    }
};

try{
    const { value1, value2 } = parseArguments(process.argv);
    console.log(calculateBMI(value1, value2));
} catch (error: unknown){
    let errorMessage = 'Something bad happened.';
    if (error instanceof Error){
        errorMessage += ' Error: ' + error.message;
    }
    console.log(errorMessage);
}
