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
    }
  } else {
    throw new Error('Provided values were not numbers!');
  }
}

const bmiResult = (heightCm: number, massKg: number) => {
  const bmi = massKg / ((heightCm / 100) ** 2)
  switch (true) {
    case (bmi < 18.5): 
      console.log(`underweight, bmi value: ${bmi}`)
      break
    case (bmi >= 18.5 && bmi < 25): 
      console.log(`normal range, bmi value: ${bmi}`)
      break
    case (bmi >= 25): 
      console.log(`overweight, bmi value: ${bmi}`)
      break
  }
}

try {
  const { value1, value2 } = parseArguments(process.argv);
  bmiResult(value1, value2);
} catch (error: unknown) {
  let errorMessage = 'Something bad happened.'
  if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message;
  }
  console.log(errorMessage);
}