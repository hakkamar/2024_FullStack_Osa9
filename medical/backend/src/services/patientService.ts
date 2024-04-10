import patientData from "../../data/patients";

import { Patient, NonSensitivePatientEntry, NewPatientEntry } from "../types";

import { v1 as uuidv1 } from "uuid";

const patients: Patient[] = patientData;

const getEntries = (): Patient[] => {
  //console.log("patients", patients);
  return patients;
};

const getNonSensitivePatientEntries = (): NonSensitivePatientEntry[] => {
  return patients.map(
    ({ id, name, dateOfBirth, gender, occupation, entries }) => ({
      id,
      name,
      dateOfBirth,
      gender,
      occupation,
      entries,
    })
  );
};

const findById = (id: string): Patient | undefined => {
  const entry = patients.find((d) => d.id === id);
  return entry;
};

const addPatient = (entry: NewPatientEntry): Patient => {
  const newPatient = {
    id: uuidv1(),
    ...entry,
  };

  patients.push(newPatient);
  return newPatient;
};

export default {
  getEntries,
  getNonSensitivePatientEntries,
  findById,
  addPatient,
};
