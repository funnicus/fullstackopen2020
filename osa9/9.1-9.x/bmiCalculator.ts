interface parseValues {
    weight: number,
    height: number
}

export const calculateBmi = (weight: number, height: number): string => {
    const BMI = weight / ((height / 100) * (height / 100));
    console.log('Your BMI: ', BMI);
    if (BMI < 18.5) return 'underweight';
    else if (BMI <= 25) return 'Normal (healthy weight)';
    else if (BMI <= 30) return 'overweight';
    else return 'obese';
};

const parseArgumentsBMI = (args: Array<string>): parseValues => {
    if (args.length < 4) throw new Error('Not enough arguments');

    const height = Number(process.argv[3]);
    const weight = Number(process.argv[2]);

    if (height < 0 || weight < 0) throw new Error('Some of the provided values were negative!');

    if (!isNaN(weight) && !isNaN(height)) {
        return {
            weight: weight,
            height: height
        };
    } else {
        throw new Error('Provided values were not numbers!');
    }
};

try {
    const { weight, height } = parseArgumentsBMI(process.argv);
    console.log(`Your weight: ${weight}. Your height: ${height}.`);
    console.log(calculateBmi(weight, height));
} catch (error) {
    const err = error as Error;
    console.log('Something went wrong...', err.message);
}
