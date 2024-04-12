import patientData from "../../data/patients";

import {
  Patient,
  NonSensitivePatientEntry,
  NewPatientEntry,
  EntryWithoutId,
  Entry,
} from "../types";

import { v1 as uuidv1 } from "uuid";

const patients: Patient[] = patientData;

const getEntries = (): Patient[] => {
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

const addPatientsEntry = (entry: EntryWithoutId, id: string): Patient => {
  const newEntry = {
    id: uuidv1(),
    ...entry,
  };

  const potilas = findById(id);
  if (potilas) {
    let potilaanEnryt: Entry[] = [];
    potilaanEnryt = potilas.entries as Entry[];
    if (potilaanEnryt) {
      potilaanEnryt.push(newEntry);
    }

    const updatedPatient = {
      ...potilas,
      entries: potilaanEnryt,
    };
    patients.map((p) => (p.id === updatedPatient.id ? updatedPatient : p));

    return updatedPatient;
  } else {
    return {} as Patient;
  }
};

export default {
  getEntries,
  getNonSensitivePatientEntries,
  findById,
  addPatient,
  addPatientsEntry,
};
