import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3232/auth",
  withCredentials: true
});

export const apiFetch = axios.create({
  baseURL: "http://localhost:3232"
});

export const googleAuth = (code) => api.get(`/google?code=${code}`);
