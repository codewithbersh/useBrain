import { isAxiosError } from "axios";
import { axiosApi } from "@/lib/axios-api";
import { History, MyHistory, NewHistory } from "@/types";

interface NewHistoryProps {
  accessToken: string;
  history: NewHistory;
}

export const newHistory = async ({ accessToken, history }: NewHistoryProps) => {
  try {
    const { data } = await axiosApi.post<History>(
      "new-history/",
      {
        player: history.player,
        lesson: history.lesson,
        total_questions: history.total_questions,
        total_correct_answers: history.total_correct_answers,
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    return data;
  } catch (error) {
    if (isAxiosError(error)) {
      console.log("error message: ", error.message);
      return error.message;
    } else {
      console.log("unexpected error: ", error);
      return "An unexpected error occurred";
    }
  }
};

interface GetLessonHistoryProps {
  lessonId: string;
}

export const getLessonHistory = async ({ lessonId }: GetLessonHistoryProps) => {
  try {
    const { data } = await axiosApi.get<MyHistory[]>(
      `history?lesson_id=${lessonId}`
    );
    return data;
  } catch (error) {
    if (isAxiosError(error)) {
      console.log("error message: ", error.message);
      return error.message;
    } else {
      console.log("unexpected error: ", error);
      return "An unexpected error occurred";
    }
  }
};

export const getMyHistory = async (accessToken: string) => {
  try {
    const { data } = await axiosApi.get<MyHistory[]>("my-history/", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return data;
  } catch (error) {
    if (isAxiosError(error)) {
      console.log("error message: ", error.message);
      return null;
    } else {
      console.log("unexpected error: ", error);
      return null;
    }
  }
};
