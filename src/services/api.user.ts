import axios from "axios";
import { AuthDTO, UserDTO } from "../types/user.type";

const BASE_URL = "http://localhost:4000";

export const register = async (data: Partial<UserDTO>) => {
  const response = await axios.post<AuthDTO>(`${BASE_URL}/auth/register`, data);
  saveToken(response.data.token);
  return response.data;
};

export const login = async (data: Partial<UserDTO>) => {
  const response = await axios.post<AuthDTO>(`${BASE_URL}/auth/login`, data);
  saveToken(response.data.token);
  return response.data;
};

const saveToken = (token: string) => {
  sessionStorage.setItem("token", token);
};
