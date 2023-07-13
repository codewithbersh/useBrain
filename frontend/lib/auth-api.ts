import { axiosApi } from "@/lib/axios-api";

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
