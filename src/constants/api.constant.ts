export const API_URL = process.env.REACT_APP_API_URL || "http://localhost:4000";
export const MAPBOX_TOKEN =
  process.env.MAPBOX_TOKEN ||
  "pk.eyJ1IjoibGVvZXhlZSIsImEiOiJjbHczbDM2YWUxMG1yMmlvY2FpajZmNnBuIn0.sgGHEC6thAy1yS1ExR58Hw";

export const getUserToken = () => {
  return sessionStorage.getItem("token");
};
