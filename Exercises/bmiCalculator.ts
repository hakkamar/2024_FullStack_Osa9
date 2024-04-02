import { parseArguments } from "./utils";

export const calculateBmi = (height: number, weight: number): string => {
  if (height < 40) {
    throw new Error("Minimum height 40 cm");
  }
  if (weight < 40) {
    throw new Error("Minimum weight 40 kg");
  }

  const pituudenNelio = (height / 100) ** 2;
  const bmi = weight / pituudenNelio;

  switch (true) {
    case bmi < 16:
      return "Underweight (Severe thinness)";
    case bmi < 17:
      return "Underweight (Moderate thinness)";
    case bmi < 18.5:
      return "Underweight (Mild thinness)";
    case bmi < 25:
      return "Normal (healthy weight)";
    case bmi < 30:
      return "Overweight (Pre-obese)";
    case bmi < 35:
      return "Obese (Class I)";
    case bmi < 40:
      return "Obese (Class II)";
    case bmi >= 40:
      return "Obese (Class III)";
    default:
      return "malformatted parameters";
  }
};

try {
  const { value1, value2 } = parseArguments(process.argv);
  console.log(calculateBmi(value1, value2));
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

//console.log(process.argv);
