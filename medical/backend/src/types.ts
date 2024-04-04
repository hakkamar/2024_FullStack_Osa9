//export type Gender = "male" | "female" | "other";

export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}

export type NewPatientEntry = Omit<Patient, "id">;

export type NonSensitivePatientEntry = Omit<Patient, "ssn">;

export interface Patient {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: string;
  occupation: string;
}

export enum Gender {
  Male = "male",
  Female = "female",
  Other = "other",
}
