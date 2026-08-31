import axios from "axios";

const API = axios.create({
  baseURL: "https://hospitalmanagementsystem-2-09xb.onrender.com"
});

// attach token automatically
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.Authorization = token;
  }
  return req;
});

export default API;

