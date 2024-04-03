interface MultiplyValues {
  targetAmount: number;
  dailyExerciseHours: number[];
}

//type StringOrNumber = number[] | string[];

export const parseManyArguments = (args: string[]): MultiplyValues => {
  if (args.length < 4) throw new Error("parameters missing");

  //let dehTemp: number[];
  //dehTemp = [];
  const dehTemp: number[] = [];

  args.forEach((val, i) => {
    if (i > 2) {
      if (!isNaN(Number(val))) {
        dehTemp.push(Number(val));
      } else {
        throw new Error("malformatted parameters");
      }
    }
  });

  // muut paramertit tuli jo tarkastettua, tarkastetaan vielä varmuuden välttämiseksi targetAmount...
  if (!isNaN(Number(args[2]))) {
    return {
      targetAmount: Number(args[2]),
      dailyExerciseHours: dehTemp,
    };
  } else {
    throw new Error("malformatted parameters");
  }
};

interface ReturnValues {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

export const calculateExercises = (
  dailyExerciseHours: number[],
  targetAmount: number
): ReturnValues => {
  const periodLength = dailyExerciseHours.length;

  let trainingDays = 0;
  let trainingHours = 0;
  for (let index = 0; index < periodLength; index++) {
    if (dailyExerciseHours[index] !== 0) {
      trainingDays++;
      trainingHours += dailyExerciseHours[index];
    }
  }

  const trainingHoursAvg = trainingHours / periodLength;

  let trainingSuccess = false;
  let ratingDescription = "";
  let rating = 0;
  const puoletTavoitteesta = targetAmount / 2;

  switch (true) {
    case trainingHoursAvg >= targetAmount: {
      trainingSuccess = true;
      ratingDescription = "Good Work! Keep on going girl...";
      rating = 3;
      break;
    }
    case trainingHoursAvg > puoletTavoitteesta: {
      ratingDescription = "Not too bad but could be better...";
      rating = 2;
      break;
    }
    case trainingHoursAvg > 0: {
      ratingDescription = "Really? Do something babe...";
      rating = 1;
      break;
    }
    default:
      ratingDescription = "Are You ill? If so, rest...";
  }

  return {
    periodLength: periodLength,
    trainingDays: trainingDays,
    success: trainingSuccess,
    rating: rating,
    ratingDescription: ratingDescription,
    target: targetAmount,
    average: trainingHoursAvg,
  };
};

//console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2));

try {
  const { targetAmount, dailyExerciseHours } = parseManyArguments(process.argv);

  console.log(calculateExercises(dailyExerciseHours, targetAmount));
} catch (error: unknown) {
  let errorMessage = "Something bad happened.";
  // here we can not use error.message
  if (error instanceof Error) {
    // the type is narrowed and we can refer to error.message
    errorMessage += " Error: " + error.message;
  }
  // here we can not use error.message
  console.log(errorMessage);
}
