import axios from "axios";
import { NonSensitiveDiaryEntry, DiaryEntry, NewDiaryEntry } from "../types";

const baseUrl = "http://localhost:3000/api/diaries";

export const getNonSensitiveDiaries = () => {
  return axios
    .get<NonSensitiveDiaryEntry[]>(baseUrl)
    .then((response) => response.data);
};

export const getAllDiaries = async () => {
  const response = await axios.get<DiaryEntry[]>(baseUrl);
  return response.data;
};

export const createDiary = async (object: NewDiaryEntry) => {
  try {
    const response = await axios
      .post<NewDiaryEntry>(baseUrl, object)
      .then((response) => response.data);

    return response;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const horror = error.response;
      if (horror) {
        //console.error("horror.data", horror.data);
        return horror.data;
      } else {
        //console.error("error.response", error.response);
        return error.response;
      }
    } /* else {
      console.error("error", error);
    }
    */
    return error;
  }
};
