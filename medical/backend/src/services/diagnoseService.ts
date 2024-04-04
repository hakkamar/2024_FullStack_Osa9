import diagnoseData from "../../data/diagnoses";

import { Diagnosis } from "../types";

const diagnoses: Diagnosis[] = diagnoseData;

const getEntries = (): Diagnosis[] => {
  return diagnoses;
};

const addDiagnose = () => {
  return null;
};

export default {
  getEntries,
  addDiagnose,
};
