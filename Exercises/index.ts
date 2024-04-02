//const express = require("express");
import express from "express";
import { calculateBmi } from "./bmiCalculator";

var qs = require("qs");
//var assert = require("assert");

const app = express();

app.get("/hello", (_req, res) => {
  res.send("Hello Full Stack!");
});

app.get("/bmi", (_req, res) => {
  // http://localhost:3003/bmi?height=180&weight=72

  var prefixed = qs.parse(_req.query, { ignoreQueryPrefix: true });
  //console.log("prefixed", prefixed); // { height: '180', weight: '72' }
  //console.log("prefixed.height", prefixed.height);
  //console.log("prefixed.weight", prefixed.weight);

  if (prefixed.height === undefined) throw new Error("malformatted parameters");
  if (prefixed.weight === undefined) throw new Error("malformatted parameters");

  if (!Number(prefixed.height)) throw new Error("malformatted parameters");
  if (!Number(prefixed.weight)) throw new Error("malformatted parameters");

  const h = Number(prefixed.height);
  const w = Number(prefixed.weight);

  res.send({
    weight: w,
    height: h,
    bmi: calculateBmi(h, w),
  });
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
