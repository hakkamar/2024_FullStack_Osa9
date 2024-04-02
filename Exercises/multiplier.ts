import { parseArguments } from "./utils";

const multiplicator = (a: number, b: number, printText: string) => {
  console.log(printText, a * b);
};

try {
  const { value1, value2 } = parseArguments(process.argv);
  multiplicator(
    value1,
    value2,
    `Multiplied ${value1} and ${value2}, the result is:`
  );
} catch (error: unknown) {
  let errorMessage = "Something bad happened.";
  if (error instanceof Error) {
    errorMessage += " Error: " + error.message;
  }
  console.log(errorMessage);
}

/*
const multiplicator = (a: number, b: number, printText: string) => {
  console.log(printText, a * b);
};

const a: number = Number(process.argv[2]);
const b: number = Number(process.argv[3]);
multiplicator(a, b, `Multiplied ${a} and ${b}, the result is:`);


const multiplicator = (a: number, b: number, printText: string) => {
  console.log(printText, a * b);
};

multiplicator(2, 4, "Multiplied numbers 2 and 4, the result is:");

multiplicator(
  "how about a string?",
  4,
  "Multiplied a string and 4, the result is:"
);
*/
