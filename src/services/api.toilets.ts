import axios from "axios";
import { ToiletDTO } from "../types/toilets.type";
import { API_URL } from "../constants/api.constant";

export const getToilets = async () => {
  const response = await axios.get<ToiletDTO[]>(`${API_URL}/toilets`);
  return response.data;
};

export const postToilet = async (toilet: Partial<ToiletDTO>) => {
  const response = await axios.post<ToiletDTO>(`${API_URL}/toilets`, toilet);
  return response.data;
};
