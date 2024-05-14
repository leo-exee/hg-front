import axios from "axios";
import { AuthDTO, UserDTO } from "../types/user.type";
import { API_URL } from "../constants/api.constant";

export const register = async (data: Partial<UserDTO>) => {
  const response = await axios.post<AuthDTO>(`${API_URL}/auth/register`, data);
  saveToken(response.data.token);
  return response.data;
};

export const login = async (data: Partial<UserDTO>) => {
  const response = await axios.post<AuthDTO>(`${API_URL}/auth/login`, data);
  saveToken(response.data.token);
  return response.data;
};

const saveToken = (token: string) => {
  localStorage.setItem("token", token);
  sessionStorage.setItem("token", token);
};
