interface CalculateBmi {
  value1: number;
  value2: number;
}

const parseArguments = (args: string[]): CalculateBmi => {
  if (args.length < 4) throw new Error('Not enough arguments');
  if (args.length > 4) throw new Error('Too many arguments');

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      value1: Number(args[2]),
      value2: Number(args[3])
    };
  } else {
    throw new Error('Provided values were not numbers!');
  }
};

const bmiResult = (heightCm: number, massKg: number): string => {
  const bmi = massKg / ((heightCm / 100) ** 2);
  switch (true) {
    case (bmi > 0 && bmi < 18.5): 
      return `underweight, bmi value: ${bmi}`;
    case (bmi >= 18.5 && bmi < 25): 
      return `normal range, bmi value: ${bmi}`;
    case (bmi >= 25 && bmi < 100): 
      return `overweight, bmi value: ${bmi}`;
    default:
      return 'malformatted parameters';
  }
};

if (require.main === module) {
    const { value1, value2 } = parseArguments(process.argv);
    console.log(bmiResult(value1, value2));
  }

export const bmi = (height:number, weight:number) => {
  try {
  const result = {
    weight: weight,
    height: height,
    bmi: bmiResult(height, weight)
  };
  return result;
} catch (error: unknown) {
  let errorMessage = 'Something bad happened.';
  if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message;
  }
  console.log(errorMessage);
  return { error: errorMessage};
}
};