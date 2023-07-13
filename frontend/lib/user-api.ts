import { AxiosResponse } from "axios";
import { axiosApi } from "@/lib/axios-api";

export type User = {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  nickname: string;
};

export const getUser = async (accessToken: string): Promise<Array<User>> => {
  try {
    const res = await axiosApi.get("users/", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    if (res.status === 200) {
      return res.data;
    } else {
      throw new Error(`Request failed with status code ${res.status}`);
    }
  } catch (error) {
    console.error("getUser Error: ", error);
    return [];
  }
};

type AddNicknameProps = {
  userId: string;
  accessToken: string;
  nickname: string;
};

export const addNickname = async ({
  accessToken,
  nickname,
  userId,
}: AddNicknameProps) => {
  try {
    const res = await axiosApi.patch(
      `users/${userId}/`,
      {
        nickname: nickname,
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    if (res.status === 200) {
      return res.data;
    } else {
      throw new Error(`Request failed with status code ${res.status}`);
    }
  } catch (error) {
    console.log(error);
    return error;
  }
};
