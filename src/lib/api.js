import axios from "axios";

export const writePost = ({ title, content, tags }) =>
  axios.post("/api/posts", { title, content, tags });
