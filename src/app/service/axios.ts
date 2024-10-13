import axios from "axios";

export const ApiInstance = axios.create({
  baseURL:
    process.env.baseUrl?.replace(/['";]/g, "") ||
    "http://localhost:8080/api/v1/",
  timeout: 10000,
  headers: {
    "X-Custom-Header": "foobar",
  },
});

export const getApiConfig = () => {
  const token = localStorage.getItem("token");
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  return config;
};
