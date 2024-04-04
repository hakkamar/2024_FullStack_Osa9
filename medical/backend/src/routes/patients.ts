import express from "express";
import patientService from "../services/patientService";

const router = express.Router();

router.get("/", (_req, res) => {
  //console.log(_req.headers);
  //console.log(_req.get("Content-Type"));

  console.log("someone wants patients");
  res.json(patientService.getNonSensitivePatientEntries());
});

router.post("/", (_req, res) => {
  res.send("Saving a patient!");
});

export default router;
