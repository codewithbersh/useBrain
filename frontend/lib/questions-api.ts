import { axiosApi } from "@/lib/axios-api";
import { Question } from "@/types";
import { AxiosResponse } from "axios";

export const getQuestions = async (
  quizId: string
): Promise<Array<Question>> => {
  try {
    const res: AxiosResponse<Question[]> = await axiosApi.get(
      `quizzes/${quizId}/questions/`
    );
    if (res.status === 200) {
      return res.data;
    } else {
      throw new Error(`Request failed with status code ${res.status}`);
    }
  } catch (error) {
    throw new Error(`Error: ${error}`);
  }
};
