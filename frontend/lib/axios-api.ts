import axios from "axios";

export const axiosApi = axios.create({
  baseURL: process.env.BACKEND_URL,
});

export const initializeBackend = async () => {
  try {
    const { data } = await axiosApi.get<boolean>("init/");
    return data;
  } catch (error) {
    throw new Error("Backend is not running");
  }
};
