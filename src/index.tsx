import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import axios from "axios";
import { API_URL } from "./constants/api.constant";

axios.defaults.baseURL = API_URL;
axios.defaults.headers.common["Authorization"] =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NjA3ZGI0M2Q4Mjg5ZDkyNmMwNjg2YzMiLCJpc0FkbWluIjpmYWxzZSwiZGF0ZUNyZWF0ZWQiOiIyMDI0LTAzLTMwIDA5OjI4OjM1In0.hh1NLAIbusISW3UDwOvflIIfOOHCN-4bfQdMyq2FCaI";
axios.defaults.headers.post["Content-Type"] = "application/json";

axios.interceptors.request.use(
  (request) => {
    return {
      ...request,
      params: {
        ...request.params,
      },
    };
  },
  (error) => {
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(<App />);

reportWebVitals();
