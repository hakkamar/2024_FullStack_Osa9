//const express = require("express");
import express from "express";
import { calculateBmi } from "./bmiCalculator";
import { calculator, Operation } from "./calculator";
import { calculateExercises } from "./exerciseCalculator";

//var qs = require("qs");
import qs from "qs";
//import querystring from "node:querystring";
//var assert = require("assert");

const app = express();

app.use(express.json());

app.get("/hello", (_req, res) => {
  res.send("Hello Full Stack!");
});

/*
//
//
.json vai .sen vai....? vai vai vai....
//
//
//
*/

app.get("/bmi", (req, res) => {
  // http://localhost:3003/bmi?height=180&weight=72

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const query: any = /* no clue what the type will be! */ req.query;
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  const prefixed = qs.parse(query, { ignoreQueryPrefix: true });

  if (prefixed.height === undefined)
    return res.status(400).send({ error: "parameters missing" });
  if (prefixed.weight === undefined)
    return res.status(400).send({ error: "parameters missing" });

  if (!Number(prefixed.height))
    return res.status(400).send({ error: "malformatted parameters" });
  if (!Number(prefixed.weight))
    return res.status(400).send({ error: "malformatted parameters" });

  const h = Number(prefixed.height);
  const w = Number(prefixed.weight);

  //return res.send({
  return res.json({
    weight: w,
    height: h,
    bmi: calculateBmi(h, w),
  });
});

app.post("/exercises", (req, res) => {
  //console.log("req.body", req.body);

  //console.log(req.headers);

  const { daily_exercises, target } = req.body; /* eslint-disable-line */

  if (!target) {
    return res.status(400).send({ error: "parameters missing" });
  }
  if (isNaN(Number(target))) {
    return res.status(400).send({ error: "malformatted parameters" });
  }
  // eslint-disable-next-line  @typescript-eslint/no-unsafe-call
  if (!daily_exercises) {
    return res.status(400).send({ error: "parameters missing" });
  }

  const dehTemp: number[] = [];
  daily_exercises.forEach((val: string) /* eslint-disable-line */ => {
    if (!isNaN(Number(val))) {
      dehTemp.push(Number(val));
    }
  });

  // eslint-disable-next-line  @typescript-eslint/no-unsafe-member-access
  if (dehTemp.length !== daily_exercises.length) {
    //return res.status(400).json({ error: "malformatted parameters !!" });
    return res.status(400).send({ error: "malformatted parameters" });
  }

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const targetAmount: number = Number(target);
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const dailyExerciseHours: number[] = dehTemp;

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const result = calculateExercises(dailyExerciseHours, targetAmount);

  return res.send({ result });
});

app.post("/calculate", (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { value1, value2, op } = req.body;

  if (!value1 || isNaN(Number(value1))) {
    return res.status(400).send({ error: "malformatted parameters" });
  }
  if (!value2 || isNaN(Number(value2))) {
    return res.status(400).send({ error: "malformatted parameters" });
  }

  const operation = op as Operation;
  const result = calculator(Number(value1), Number(value2), operation);

  return res.send({ result });
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
