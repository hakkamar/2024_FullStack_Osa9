import {
  NewPatientEntry,
  Gender,
  Entry,
  Type,
  EntryWithoutId,
  Diagnosis,
  Discharge,
  HealthCheckRating,
  SickLeave,
} from "./types";

const isString = (text: unknown): text is string => {
  return typeof text === "string" || text instanceof String;
};

const isNumber = (number: unknown): number is number => {
  return typeof number === "number" || number instanceof Number;
};

const parseName = (name: unknown): string => {
  if (!isString(name)) {
    throw new Error("Incorrect or missing name");
  }
  return name;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const parseDateOfBirth = (dateOfBirth: unknown): string => {
  if (!isString(dateOfBirth) || !isDate(dateOfBirth)) {
    throw new Error("Incorrect date of Birth: " + dateOfBirth);
  }
  return dateOfBirth;
};

const parseSsn = (ssn: unknown): string => {
  if (!isString(ssn)) {
    throw new Error("Incorrect or missing ssn");
  }
  return ssn;
};

const isGender = (param: string): param is Gender => {
  return Object.values(Gender)
    .map((v) => v.toString())
    .includes(param);
};

const parseGender = (gender: unknown): Gender => {
  if (!isString(gender) || !isGender(gender)) {
    throw new Error("Incorrect gender: " + gender);
  }
  return gender;
};

const parseOccupation = (occupation: unknown): string => {
  if (!isString(occupation)) {
    throw new Error("Incorrect or missing occupation");
  }
  return occupation;
};

const parseDiagnosisCodes = (object: unknown): Array<Diagnosis["code"]> => {
  if (!object || typeof object !== "object") {
    // we will just trust the data to be in correct form
    return [] as Array<Diagnosis["code"]>;
  }
  return object as Array<Diagnosis["code"]>;
};

const parseEntries = (entries: unknown): Entry => {
  if (!entries || typeof entries !== "object") {
    // we will just trust the data to be in correct form
    return [] as unknown as Entry;
  }

  const merkinta = Object.values(entries);
  for (let index = 0; index < merkinta.length; index++) {
    // tarkastetaan vain tyyppi
    if (
      !Object.values(Type)
        .map((t) => t.toString())
        .includes(String(merkinta[index].type))
    ) {
      throw new Error(
        "Incorrect or missing type in etries: " + merkinta[index].type
      );
    }
  }
  return entries as Entry;
};

const isType = (param: string): param is Type => {
  return Object.values(Type)
    .map((v) => v.toString())
    .includes(param);
};

const parseType = (type: unknown): Type => {
  if (!isString(type) || !isType(type)) {
    throw new Error("Incorrect type: " + type);
  }
  return type;
};

const parseDescription = (description: unknown): string => {
  if (!isString(description) || description.length === 0) {
    throw new Error("Incorrect or missing description");
  }
  return description;
};

const parseDate = (date: unknown): string => {
  if (!isString(date) || date.length === 0) {
    throw new Error("Incorrect or missing date");
  }
  return date;
};

const parseSpecialist = (specialist: unknown): string => {
  if (!isString(specialist) || specialist.length === 0) {
    throw new Error("Incorrect or missing specialist");
  }
  return specialist;
};

const parseDischarge = (discharge: Discharge): Discharge => {
  if (
    !discharge ||
    discharge.date.length === 0 ||
    discharge.criteria.length === 0
  ) {
    throw new Error("Incorrect or missing discharge data");
  }
  return discharge;
};

const isHealthCheckRating = (param: number): param is HealthCheckRating => {
  return Object.values(HealthCheckRating)
    .map((v) => v)
    .includes(param);
};

const parseHealthCheckRating = (
  healthCheckRating: unknown
): HealthCheckRating => {
  if (!isNumber(healthCheckRating) || !isHealthCheckRating(healthCheckRating)) {
    throw new Error("Incorrect type: " + healthCheckRating);
  }
  return healthCheckRating;
};

const parseEmployerName = (employerName: unknown): string => {
  if (!isString(employerName) || employerName.length === 0) {
    throw new Error("Incorrect or missing employerName");
  }
  return employerName;
};

const parseSickLeave = (object: unknown): SickLeave => {
  if (!object) {
    return {} as SickLeave;
  }
  return object as SickLeave;
};

export const toNewEntryEntry = (object: EntryWithoutId): EntryWithoutId => {
  if (!object || typeof object !== "object") {
    throw new Error("Incorrect or missing data");
  }

  if (
    "type" in object &&
    "description" in object &&
    "date" in object &&
    "specialist" in object
  ) {
    switch (parseType(object.type)) {
      case Type.Hospital:
        if ("discharge" in object) {
          const newHospitalEntry: EntryWithoutId = {
            type: "Hospital",
            description: parseDescription(object.description),
            date: parseDate(object.date),
            specialist: parseSpecialist(object.specialist),
            diagnosisCodes: parseDiagnosisCodes(object.diagnosisCodes),
            discharge: parseDischarge(object.discharge),
          };
          return newHospitalEntry;
        }
        throw new Error("Incorrect data: a field missing");

      case Type.HealthCheck:
        if ("healthCheckRating" in object) {
          const newHealthCheckEntry: EntryWithoutId = {
            type: "HealthCheck",
            description: parseDescription(object.description),
            date: parseDate(object.date),
            specialist: parseSpecialist(object.specialist),
            diagnosisCodes: parseDiagnosisCodes(object.diagnosisCodes),
            healthCheckRating: parseHealthCheckRating(object.healthCheckRating),
          };
          return newHealthCheckEntry;
        }
        throw new Error("Incorrect data: a field missing");

      case Type.OccupationalHealthcare:
        if ("employerName" in object) {
          const newOccupationalHealthcareEntry: EntryWithoutId = {
            type: "OccupationalHealthcare",
            description: parseDescription(object.description),
            date: parseDate(object.date),
            specialist: parseSpecialist(object.specialist),
            diagnosisCodes: parseDiagnosisCodes(object.diagnosisCodes),
            employerName: parseEmployerName(object.employerName),
            sickLeave: parseSickLeave(object.sickLeave),
          };
          return newOccupationalHealthcareEntry;
        }
        throw new Error("Incorrect data: a field missing");
      default:
        throw new Error("Incorrect data: a field missing");
    }
  }
  throw new Error("Incorrect data: a field missing");
};

const toNewPatientEntry = (object: unknown): NewPatientEntry => {
  if (!object || typeof object !== "object") {
    throw new Error("Incorrect or missing data");
  }

  if (
    "name" in object &&
    "dateOfBirth" in object &&
    "ssn" in object &&
    "gender" in object &&
    "occupation" in object &&
    "entries" in object
  ) {
    const newEntry: NewPatientEntry = {
      name: parseName(object.name),
      dateOfBirth: parseDateOfBirth(object.dateOfBirth),
      ssn: parseSsn(object.ssn),
      gender: parseGender(object.gender),
      occupation: parseOccupation(object.occupation),
      entries: parseEntries(object.entries),
    };
    return newEntry;
  }
  throw new Error("Incorrect data: a field missing");
};

export default toNewPatientEntry;
