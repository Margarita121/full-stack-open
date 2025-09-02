const parseExerciseData = (args: string[]): number[] => {
  const stringArray = args.slice(2)
  let numberArray = stringArray.map(Number)
  if (numberArray.includes(NaN)){
    throw new Error('Provided values were not numbers!');
  } else {
    return numberArray
  }
}

const exerciseResult = (data: number[]) => {
  const trainingTarget = data.shift()
  const trainingDaysCount = data.filter((day) => day).length
  const totalTrainingHours = data.reduce((a, b) => a + b, 0)
  const averageTrainingHours = totalTrainingHours / data.length
  const averageVsTargetPercent = averageTrainingHours * 100 / trainingTarget
  let rating = 0
  let ratingDescription = ""
  if (averageVsTargetPercent < 40){
    rating = 1
    ratingDescription = `you did only ${averageVsTargetPercent}% of target training hours :(`
  } else if (averageVsTargetPercent >= 40 && averageVsTargetPercent < 70){
    rating = 2
    ratingDescription = `you did ${averageVsTargetPercent}% of target training hours, almost there`
  } else if (averageVsTargetPercent > 70){
    rating = 3
    ratingDescription = `you did ${averageVsTargetPercent}% of target training hours, good job`
  }


  const result = {
    periodLength: data.length,
    trainingDays: trainingDaysCount,
    success: averageTrainingHours >= trainingTarget ? true : false,
    rating: rating,
    ratingDescription: ratingDescription,
    target: trainingTarget,
    average: averageTrainingHours
  }

  console.log(result)
}

try {
  const ar = parseExerciseData(process.argv);
  exerciseResult(ar);
} catch (error: unknown) {
  let errorMessage = 'Something bad happened.'
  if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message;
  }
  console.log(errorMessage);
}