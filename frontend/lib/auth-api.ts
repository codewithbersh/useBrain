import axios, { AxiosResponse } from "axios";
import { userApi } from "./user-api";

export const authApi = axios.create({
  baseURL: "http://127.0.0.1:8000/api/",
});

export const getAccessToken = async (id_token: string): Promise<string> => {
  if (!id_token) throw new Error();
  try {
    const res = await authApi.post("auth/google/", {
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
    const res = await userApi.get("users/", {
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
