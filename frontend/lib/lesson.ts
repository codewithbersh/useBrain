import { notFound } from "next/navigation";
import { AxiosResponse, isAxiosError } from "axios";
import { axiosApi } from "@/lib/axios-api";
import { Category, Lesson, NewLesson } from "@/types";

interface GetLessonDetailProps {
  lessonId: string;
  accessToken: string;
}

export const getLessonDetail = async ({
  lessonId,
  accessToken,
}: GetLessonDetailProps): Promise<Lesson | null> => {
  if (!lessonId) return null;
  try {
    const res: AxiosResponse<Lesson | null> = await axiosApi.get(
      `lessons/${lessonId}/`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    if (res.status === 200 || 201) {
      return res.data;
    } else {
      console.log("Res: ", res);
      notFound();
    }
  } catch (error) {
    console.log("Error: ", error);
    notFound();
  }
};

type UpdateLessonDetailProps = {
  lessonId: string;
  title: string;
  category: Category;
  isPublic: boolean;
  accessToken: string;
};

export const updateLessonDetail = async ({
  title,
  category,
  isPublic,
  lessonId,
  accessToken,
}: UpdateLessonDetailProps): Promise<Lesson | null> => {
  if (!lessonId) return null;
  try {
    const res: AxiosResponse<Lesson | null> = await axiosApi.patch(
      `lessons/${lessonId}/`,
      {
        title: title,
        category: category,
        is_public: isPublic,
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
      throw new Error(`Request failed with status code ${res.status}`);
    }
  } catch (error) {
    throw new Error(`Error: ${error}`);
  }
};

export const getMyLessons = async (
  accessToken: string
): Promise<Array<Lesson> | null> => {
  try {
    const res = await axiosApi.get<Lesson[]>("lessons/", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      params: {
        owned: true,
      },
    });

    if (res.status === 200 || res.status === 201) {
      return res.data;
    } else {
      return null;
    }
  } catch (error) {
    console.error(error);
    return null;
  }
};

type DeleteMyLessonProps = {
  lessonId: string;
  accessToken: string;
};

export const deleteMyLesson = async ({
  lessonId,
  accessToken,
}: DeleteMyLessonProps) => {
  try {
    const res = await axiosApi.delete(`lessons/${lessonId}/`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    if (res.status === 200 || res.status === 201) {
      return res.data;
    } else {
      return null;
    }
  } catch (error) {
    console.error(error);
    return null;
  }
};

type CreateLessonProps = {
  lesson: NewLesson;
  accessToken: string;
};

export const createLesson = async ({
  lesson,
  accessToken,
}: CreateLessonProps): Promise<Lesson | null> => {
  try {
    const res = await axiosApi.post<Lesson | null>(
      "lessons/",
      {
        owner: lesson.owner,
        category: lesson.category,
        is_public: lesson.isPublic,
        title: lesson.title,
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    if (res.status === 200 || res.status === 201) {
      return res.data;
    } else {
      return null;
    }
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const getPublicLessons = async () => {
  try {
    const { data, status } = await axiosApi.get<Lesson[]>("lessons/", {
      params: { is_public: true },
    });
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

export const getPublicLesson = async (id: string) => {
  try {
    const { data } = await axiosApi.get<Lesson>(`lessons/${id}/`);
    if (data.is_public && data.total_questions !== 0) {
      return data;
    } else {
      return "lesson should be public and at least one question";
    }
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

export const getLesson = async (id: string) => {
  try {
    const { data } = await axiosApi.get<Lesson>(`lessons/${id}/`);
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
