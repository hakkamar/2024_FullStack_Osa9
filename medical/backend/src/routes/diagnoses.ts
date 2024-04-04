import express from "express";
import diagnoseService from "../services/diagnoseService";

const router = express.Router();

router.get("/", (_req, res) => {
  //console.log(_req.headers);

  console.log("someone wants diagnoses");
  res.json(diagnoseService.getEntries());
});

router.post("/", (_req, res) => {
  res.send("Saving a diagnose!");
});

export default router;
