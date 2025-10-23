// src/services/api.js
import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api", // backend base URL
  withCredentials: true,
});

export const registerUser = (data) => API.post("/auth/register", data);
export const loginUser = (data) => API.post("/auth/login", data);

API.interceptors.request.use((req) => {
  const user = JSON.parse(localStorage.getItem("user"));
  if (user?.token) {
    req.headers.Authorization = `Bearer ${user.token}`;
  }
  return req;
});

// === Comment APIs ===
export const getComments = (videoId) => API.get(`/comments/${videoId}`);
export const addComment = (videoId, text) => API.post(`/comments/${videoId}`, { text });
export const updateComment = (id, text) => API.put(`/comments/edit/${id}`, { text });
export const deleteComment = (id) => API.delete(`/comments/delete/${id}`);
