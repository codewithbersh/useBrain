import { Quiz } from "@/types";
import axios, { AxiosResponse } from "axios";

export const quizzesApi = axios.create({
  baseURL: "http://127.0.0.1:8000/api/",
});

export const getQuizzes = async (): Promise<Array<Quiz>> => {
  try {
    const res: AxiosResponse<Quiz[]> = await quizzesApi.get("quizzes/");
    if (res.status === 200 || res.status === 201) {
      return res.data;
    } else {
      throw new Error(`Request failed with status code ${res.status}`);
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Error Details:", error.response?.data);
      console.error("Request:", error.config);
    }
    throw error;
  }
};

type GetQuizProps = {
  id: string;
};

export const getQuiz = async ({ id }: GetQuizProps): Promise<Quiz> => {
  try {
    const res: AxiosResponse<Quiz> = await quizzesApi.get(`quizzes/${id}/`);
    if (res.status === 200 || res.status === 201) {
      return res.data;
    } else {
      throw new Error(`Request failed with status code ${res.status}`);
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Error Details:", error.response?.data);
      console.error("Request:", error.config);
    }
    throw error;
  }
};
