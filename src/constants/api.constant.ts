export const API_URL = process.env.REACT_APP_API_BASE_URL_DEPLOY || "";
export const MAPBOX_TOKEN = process.env.REACT_APP_MAPBOX_TOKEN || "";
export const HERE_API_KEY = process.env.REACT_APP_HERE_API_KEY || "";

export const getUserToken = () => {
  return sessionStorage.getItem("token") || localStorage.getItem("token");
};
