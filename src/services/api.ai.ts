import axios from "axios";
import { API_URL } from "../constants/api.constant";



export interface ContentDTO {
  name: string;
  address: string;
  cleanliness: number;
  accessibility: number;
  state: number;
  babyFriendly: boolean;
  handicapFriendly: boolean;
  language: string;
}

export const describeToilet = async (content: ContentDTO) => {
  const response = await axios.post(`${API_URL}/ai/describe`, content);
  return response.data;
};
