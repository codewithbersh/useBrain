import { notFound } from "next/navigation";
import { axiosApi } from "@/lib/axios-api";
import { Category, Lesson } from "@/types";
import { AxiosResponse } from "axios";

export const getLessonDetail = async (
  lessonId: string
): Promise<Lesson | null> => {
  if (!lessonId) return null;
  try {
    const res: AxiosResponse<Lesson | null> = await axiosApi.get(
      `lessons/${lessonId}/`
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
};

export const updateLessonDetail = async ({
  title,
  category,
  isPublic,
  lessonId,
}: UpdateLessonDetailProps): Promise<Lesson | null> => {
  if (!lessonId) return null;
  try {
    const res: AxiosResponse<Lesson | null> = await axiosApi.patch(
      `lessons/${lessonId}/`,
      {
        title: title,
        category: category,
        is_public: isPublic,
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
    const res = await axiosApi.get<Lesson[]>("user-lessons/", {
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
