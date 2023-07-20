import { axiosApi } from "@/lib/axios-api";
import { NewQuestion, Question } from "@/types";
import { AxiosResponse } from "axios";

type CreateQuestionProps = {
  accessToken: string;
  question: NewQuestion;
};

export const createQuestion = async ({
  accessToken,
  question,
}: CreateQuestionProps) => {
  try {
    const res: AxiosResponse<Question | null> = await axiosApi.post(
      "questions/",
      {
        question_text: question.question_text,
        lesson: question.lesson,
        choices: question.choices,
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    if (res.status === 200 || 201) {
      return res.data;
    } else {
      console.log("Error: ", res);
      return null;
    }
  } catch (error) {
    console.log(error);
    return null;
  }
};

type UpdateQuestionProps = {
  accessToken: string;
  question: Question;
};

export const updateQuestion = async ({
  accessToken,
  question,
}: UpdateQuestionProps) => {
  try {
    const res: AxiosResponse<Question | null> = await axiosApi.put(
      `questions/${question.id}/`,
      {
        id: question.id,
        question_text: question.question_text,
        lesson: question.lesson,
        choices: question.choices,
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    if (res.status === 200 || 201) {
      return res.data;
    } else {
      console.log("Error: ", res);
      return null;
    }
  } catch (error) {
    console.log(error);
    return null;
  }
};

type DeleteQuestionProps = {
  accessToken: string;
  questionId: string;
};

export const deleteQuestion = async ({
  accessToken,
  questionId,
}: DeleteQuestionProps) => {
  try {
    const res = await axiosApi.delete(`questions/${questionId}/`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (res.status === 200 || 201) {
      return res.data;
    } else {
      console.log("Error: ", res);
      return null;
    }
  } catch (error) {
    console.log(error);
    return null;
  }
};
