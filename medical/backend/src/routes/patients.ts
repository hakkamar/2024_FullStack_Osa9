import express from "express";
import patientService from "../services/patientService";
import toNewPatientEntry, { toNewEntryEntry } from "../utils";

const router = express.Router();

router.get("/", (_req, res) => {
  console.log("someone wants patients");
  //res.json(patientService.getNonSensitivePatientEntries());
  res.json(patientService.getEntries());
});

router.get("/:id", (req, res) => {
  //console.log("someone wants patient with ID ", req.params.id);
  const patient = patientService.findById(req.params.id);

  if (patient) {
    res.send(patient);
  } else {
    res.sendStatus(404);
  }
});

router.post("/:id/entries", (_req, res) => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const newPatientEntryEntry = toNewEntryEntry(_req.body);
    const addedEntry = patientService.addPatientsEntry(
      newPatientEntryEntry,
      _req.params.id
    );
    res.json(addedEntry);
  } catch (error: unknown) {
    let errorMessage = "Something went wrong.";
    if (error instanceof Error) {
      errorMessage += " Error: " + error.message;
    }
    res.status(400).send(errorMessage);
  }
});

router.post("/", (req, res) => {
  try {
    const newPatientEntry = toNewPatientEntry(req.body);
    const addedEntry = patientService.addPatient(newPatientEntry);
    res.json(addedEntry);
  } catch (error: unknown) {
    let errorMessage = "Something went wrong.";
    if (error instanceof Error) {
      errorMessage += " Error: " + error.message;
    }
    res.status(400).send(errorMessage);
  }
});

export default router;
