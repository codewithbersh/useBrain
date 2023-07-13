import { AxiosResponse, isAxiosError } from "axios";
import { Quiz } from "@/types";
import { axiosApi } from "@/lib/axios-api";

export const getQuizzesByPopularity = async (): Promise<Array<Quiz>> => {
  try {
    const res: AxiosResponse<Quiz[]> = await axiosApi.get(
      "landing-page-quizzes/?ordering=-times_played/"
    );
    if (res.status === 200 || res.status === 201) {
      return res.data;
    } else {
      throw new Error(`Request failed with status code ${res.status}`);
    }
  } catch (error) {
    if (isAxiosError(error)) {
      console.error(
        "getQuizzesByPopularity Error Details:",
        error.response?.data
      );
      console.error("getQuizzesByPopularity Request:", error.config);
    }
    throw error;
  }
};

export const getQuizzesByDateCreated = async (): Promise<Array<Quiz>> => {
  try {
    const res: AxiosResponse<Quiz[]> = await axiosApi.get(
      "landing-page-quizzes/?ordering=-created/"
    );
    if (res.status === 200 || res.status === 201) {
      return res.data;
    } else {
      throw new Error(`Request failed with status code ${res.status}`);
    }
  } catch (error) {
    if (isAxiosError(error)) {
      console.error(
        "getQuizzesByDateCreated Error Details:",
        error.response?.data
      );
      console.error("getQuizzesByDateCreated Request:", error.config);
    }
    throw error;
  }
};

export const getQuizzes = async (): Promise<Array<Quiz>> => {
  try {
    const res: AxiosResponse<Quiz[]> = await axiosApi.get("quizzes/");
    if (res.status === 200 || res.status === 201) {
      return res.data;
    } else {
      throw new Error(`Request failed with status code ${res.status}`);
    }
  } catch (error) {
    if (isAxiosError(error)) {
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
    const res: AxiosResponse<Quiz> = await axiosApi.get(`quizzes/${id}/`);
    if (res.status === 200 || res.status === 201) {
      return res.data;
    } else {
      throw new Error(`Request failed with status code ${res.status}`);
    }
  } catch (error) {
    if (isAxiosError(error)) {
      console.error("Error Details:", error.response?.data);
      console.error("Request:", error.config);
    }
    throw error;
  }
};
