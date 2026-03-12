const rawUrl = process.env.REACT_APP_API_URL || "http://localhost:8080";
const API_BASE_URL = rawUrl.endsWith("/api") ? rawUrl : `${rawUrl}/api`;

console.log("API_BASE_URL configured as:", API_BASE_URL);

export default API_BASE_URL;
