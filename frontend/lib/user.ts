import { axiosApi } from "@/lib/axios-api";
import { AxiosResponse } from "axios";

export const getAccessToken = async (id_token: string): Promise<string> => {
  try {
    const res = await axiosApi.post("auth/google/", {
      access_token: id_token,
    });

    if (res.status === 200) {
      return res.data.access;
    } else {
      throw new Error(`Request failed with status code ${res.status}`);
    }
  } catch (error) {
    throw new Error(`Error: ${error}`);
  }
};

type User = {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  nickname: string;
};

export const getUserInfo = async (accessToken: string): Promise<User> => {
  try {
    const res = await axiosApi.get("users/", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (res.status === 200) {
      return res.data[0];
    } else {
      throw new Error(`Request failed with status code ${res.status}`);
    }
  } catch (error) {
    console.log(error);
    throw new Error(`Error: ${error}`);
  }
};

export const getDemoAccessToken = async (): Promise<string> => {
  try {
    const res = await axiosApi.post("auth/login/", {
      email: process.env.DEMO_USER_EMAIL,
      password: process.env.DEMO_USER_PASSWORD,
    });

    if (res.status === 200) {
      return res.data.access;
    } else {
      throw new Error(`Request failed with status code ${res.status}`);
    }
  } catch (error) {
    throw new Error(`Error: ${error}`);
  }
};

type UpdateUserNicknameProps = {
  userId: string;
  accessToken: string;
  nickname: string;
};

export const updateUserNickname = async ({
  userId,
  accessToken,
  nickname,
}: UpdateUserNicknameProps) => {
  try {
    const res: AxiosResponse<User> = await axiosApi.patch(
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
    throw new Error(`Error: ${error}`);
  }
};
