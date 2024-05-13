import axios from "axios";
import { ToiletDTO } from "../types/toilets.type";

const BASE_URL = "http://localhost:4000";

export const getToilets = async () => {
  const response = await axios.get<ToiletDTO[]>(`${BASE_URL}/toilets`);
  return response.data;
};

export const postToilet = async (toilet: Partial<ToiletDTO>) => {
  const response = await axios.post<ToiletDTO>(`${BASE_URL}/toilets`, toilet);
  return response.data;
};
