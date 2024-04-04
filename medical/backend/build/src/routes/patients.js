"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const patientService_1 = __importDefault(require("../services/patientService"));
const router = express_1.default.Router();
router.get("/", (_req, res) => {
    //console.log(_req.headers);
    //console.log(_req.get("Content-Type"));
    console.log("someone wants patients");
    res.json(patientService_1.default.getNonSensitivePatientEntries());
});
router.post("/", (_req, res) => {
    res.send("Saving a patient!");
});
exports.default = router;
