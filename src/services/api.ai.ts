import axios from "axios";

const BASE_URL = "http://localhost:4000";

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
  const response = await axios.post(`${BASE_URL}/ai/describe`, content);
  return response.data;
};
