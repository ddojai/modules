import axios from "axios";
import queryString from "query-string";
import { ACCESS_TOKEN } from "commonConstants";

// post
export const getPost = id =>
  axios.get(`/api/posts/${id}`);
export const getPostList = ({ tag, page }) =>
  axios.get(`/api/posts/?${queryString.stringify({ tag, page })}`);
export const writePost = ({ title, content, tags, userId }) =>
  axios.post("/api/posts", { title, content, tags, userId }, { headers: { Authorization: 'Bearer ' + localStorage.getItem(ACCESS_TOKEN) } });
export const editPost = ({ id, title, content, tags }) =>
  axios.patch(`/api/posts/${id}`, { title, content, tags }, { headers: { Authorization: 'Bearer ' + localStorage.getItem(ACCESS_TOKEN) } });
export const removePost = id =>
  axios.delete(`/api/posts/${id}`, { headers: { Authorization: 'Bearer ' + localStorage.getItem(ACCESS_TOKEN) } });

// auth
export const getUser = () =>
  axios.get(`/user/me`, { headers: { Authorization: 'Bearer ' + localStorage.getItem(ACCESS_TOKEN) } });