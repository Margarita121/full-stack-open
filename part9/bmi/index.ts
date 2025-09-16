import express from 'express';
import { bmi } from './bmiCalculator';
import { execiseCalc } from './exerciseCalculator';
const app = express();
app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  const height = req.query.height;
  const weight = req.query.weight;
  res.send(bmi(Number(height), Number(weight)));
});

app.post('/exercises', (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { daily_exercises, target } = req.body;
  if (!daily_exercises || !target) {
    return res.status(400).json({ error: 'parameters missing' });
  }

  if (!Array.isArray(daily_exercises) || isNaN(Number(target))) {
    return res.status(400).json({ error: 'malformatted parameters' });
  }

  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  const result = execiseCalc(Number(target), daily_exercises);
  return res.json(result);
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});