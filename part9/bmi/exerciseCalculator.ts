const parseExerciseData = (args: string[]): number[] => {
  const stringArray = args.slice(2);
  const numberArray = stringArray.map(Number);
  if (numberArray.includes(NaN)){
    throw new Error('Provided values were not numbers!');
  } else {
    return numberArray;
  }
};

const exerciseResult = (target: number, data: number[]) => {
  const trainingDaysCount = data.filter((day) => day).length;
  const totalTrainingHours = data.reduce((a, b) => a + b, 0);
  const averageTrainingHours = totalTrainingHours / data.length;
  const averageVsTargetPercent = averageTrainingHours * 100 / target;
  let rating = 0;
  let ratingDescription = "";
  if (averageVsTargetPercent < 40){
    rating = 1;
    ratingDescription = `you did only ${averageVsTargetPercent}% of target training hours :(`;
  } else if (averageVsTargetPercent >= 40 && averageVsTargetPercent < 70){
    rating = 2;
    ratingDescription = `you did ${averageVsTargetPercent}% of target training hours, almost there`;
  } else if (averageVsTargetPercent > 70){
    rating = 3;
    ratingDescription = `you did ${averageVsTargetPercent}% of target training hours, good job`;
  }

  const result = {
    periodLength: data.length,
    trainingDays: trainingDaysCount,
    success: averageTrainingHours >= target ? true : false,
    rating: rating,
    ratingDescription: ratingDescription,
    target: target,
    average: averageTrainingHours
  };
  return result;
};

if (require.main === module) {
    const array = parseExerciseData(process.argv);
    const target = array.shift()!; //non-null assertion - if array empty returns runtime error
    exerciseResult(target, array);
}

export const execiseCalc = (target:number, hours:number[]) => {
  try {
  return exerciseResult(target, hours);
} catch (error: unknown) {
  let errorMessage = 'Something bad happened.';
  if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message;
  }
  console.log(errorMessage);
  return { error: errorMessage};
}
};