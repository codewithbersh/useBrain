import { notFound } from "next/navigation";
import { AxiosResponse } from "axios";
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

export const deleteMyLesson = async (lessonId: string) => {
  try {
    const res = await axiosApi.delete(`lessons/${lessonId}/`);
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

export const createLesson = async (
  lesson: NewLesson
): Promise<Lesson | null> => {
  try {
    const res = await axiosApi.post<Lesson | null>("lessons/", {
      owner: lesson.owner,
      category: lesson.category,
      is_public: lesson.isPublic,
      title: lesson.title,
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
