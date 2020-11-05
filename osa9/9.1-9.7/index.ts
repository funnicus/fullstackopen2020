import express from 'express';
const app = express();

app.use(express.json());

import { calculateBmi } from './bmiCalculator';
import { parseValues, calculateExercises } from './exerciseCalculator';

app.get('/hello', (_req, res) => {
    res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
    if (!req.query.weight || !req.query.height) res.status(404).json({ error: 'malformatted parameters' });
    const weight = Number(req.query.weight);
    const height = Number(req.query.height);
    if (isNaN(weight) || isNaN(height)) res.status(404).json({ error: 'malformatted parameters' });
    const bmiVerdict: string = calculateBmi(weight, height);
    res.json({
        weight: weight,
        height: height,
        bmi: bmiVerdict
    });
});

app.post('/exercise', (req, res) => {
    if (!req.body) res.status(400).json({ error: 'request body missing...' });
    const { week, target }: parseValues = req.body as parseValues;

    if (!week || !target) res.status(400).json({ error: 'parameters missing...' });
    if (week.find((d: number) => isNaN(d)) || isNaN(target)) res.status(400).json({ error: 'malformatted parameters' });

    const result = calculateExercises(week, target);
    res.json(result);
});

const PORT = 3003;

app.listen(PORT, () => {
    console.log('Server running on port ', PORT);
});