import axios from "axios";

const rawUrl = process.env.REACT_APP_API_URL || "http://localhost:8080";
const API_BASE_URL = rawUrl.endsWith("/api") ? rawUrl : `${rawUrl}/api`;

console.log("Axios API_BASE_URL configured as:", API_BASE_URL);

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json"
  }
});

// Optionally add interceptors here if needed in the future

export default axiosInstance;
