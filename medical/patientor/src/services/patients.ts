import axios from "axios";
import { Patient, PatientFormValues } from "../types";

import { apiBaseUrl } from "../constants";

const getAll = async () => {
  const { data } = await axios.get<Patient[]>(`${apiBaseUrl}/patients`);
  return data;
};
const getOne = async (id: string) => {
  const { data } = await axios.get<Patient>(`${apiBaseUrl}/patients/${id}`);
  return data;
};

const create = async (object: PatientFormValues) => {
  console.log("create");
  console.log(Object.values(object));
  const { data } = await axios.post<Patient>(`${apiBaseUrl}/patients`, object);
  return data;
};

export default {
  getAll,
  getOne,
  create,
};
