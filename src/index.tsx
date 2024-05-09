import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import axios from 'axios';
import { API_URL } from './constants/api.constant';

axios.defaults.baseURL = API_URL;
// axios.defaults.headers.common['Authorization'] = 'AUTH TOKEN';
axios.defaults.headers.post["Content-Type"] = "application/json";

axios.interceptors.request.use(
  (request) => {
    // Edit request config
    return {
      ...request,
      params: {
        ...request.params,
        access_token: request.headers.common.Authorization,
      },
    };
  },
  (error) => {
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  (response) => {
    // Edit response config
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
