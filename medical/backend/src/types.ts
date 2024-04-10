//export type Gender = "male" | "female" | "other";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface Entry {}

export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}

export type NewPatientEntry = Omit<Patient, "id">;

export type NonSensitivePatientEntry = Omit<Patient, "ssn" | "entries">;

export interface Patient {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: string;
  occupation: string;
  entries: Entry[] | unknown;
}

export enum Gender {
  Male = "male",
  Female = "female",
  Other = "other",
}
