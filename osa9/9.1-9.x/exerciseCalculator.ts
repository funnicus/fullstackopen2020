interface exerciseResult {
    periodLength: number,
    trainingDays: number,
    success: boolean,
    rating: number,
    ratingDescription: string,
    target: number,
    average: number
}

export interface parseValues {
    week: Array<number>,
    target: number
}

export const calculateExercises = (week: Array<number>, target: number): exerciseResult => {
    const average: number = week.reduce((a, b) => a + b) / week.length;
    const success: boolean = average >= target ? true : false;
    let rating: number;
    if (average >= 1.5 * target) rating = 3;
    else if (average >= target) rating = 2;
    else rating = 1;
    return {
        periodLength: week.length,
        trainingDays: week.filter(d => d > 0).length,
        success: success,
        rating: rating,
        ratingDescription: success ? 'You reached your goal!' : 'You have to push harder to reach your goal!',
        target: target,
        average: average
    };
};

const parseArguments = (args: Array<string>): parseValues => {
    if (args.length < 4) throw new Error('Not enough arguments');

    const target = Number(process.argv[2]);
    const week: Array<number> = process.argv.slice(3).map(d => Number(d));

    if (!isNaN(target) && week.find(d => isNaN(d)) === undefined) {
        return {
            week: week,
            target: target
        };
    } else {
        throw new Error('Provided values were not numbers!');
    }
};

try {
    const { week, target } = parseArguments(process.argv);
    console.log(calculateExercises(week, target));
} catch (err) {
    const error = err as Error;
    console.log('Something went wrong...', error.message);
}