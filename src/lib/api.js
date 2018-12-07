import axios from "axios";
import queryString from "query-string";
import { ACCESS_TOKEN } from "commonConstants";

// post
export const writePost = ({ title, content, tags }) =>
  axios.post("/api/posts", { title, content, tags });
export const getPost = id => axios.get(`/api/posts/${id}`);
export const getPostList = ({ tag, page }) =>
  axios.get(`/api/posts/?${queryString.stringify({ tag, page })}`);
export const editPost = ({ id, title, content, tags }) =>
  axios.patch(`/api/posts/${id}`, { title, content, tags });
export const removePost = id => axios.delete(`/api/posts/${id}`);

// auth
export const getUser = () =>
  axios.get(`/user/me`, { headers: { Authorization: 'Bearer ' + localStorage.getItem(ACCESS_TOKEN) } });