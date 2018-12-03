import axios from "axios";

export const writePost = ({ title, content, tags }) =>
  axios.post("/api/posts", { title, content, tags });
export const getPost = (id) => axios.get(`/api/posts/${id}`);