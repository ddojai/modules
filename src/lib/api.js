import axios from "axios";
import queryString from "query-string";
import { API_BASE_URL, ACCESS_TOKEN } from "commonConstants";

export const writePost = ({ title, content, tags }) =>
  axios.post("/api/posts", { title, content, tags });
export const getPost = id => axios.get(`/api/posts/${id}`);
export const getPostList = ({ tag, page }) =>
  axios.get(`/api/posts/?${queryString.stringify({ tag, page })}`);
export const editPost = ({ id, title, content, tags }) =>
  axios.patch(`/api/posts/${id}`, { title, content, tags });
export const removePost = id => axios.delete(`/api/posts/${id}`);

// export const getCurrentUser = () => {
//   if(!localStorage.getItem(ACCESS_TOKEN)) {
//     return Promise.reject("No access token set.");
//   }
//
//   return request({
//     url: API_BASE_URL + "/user/me",
//     method: 'GET'
//   });
// };

export function getCurrentUser() {
  if(!localStorage.getItem(ACCESS_TOKEN)) {
    return Promise.reject("No access token set.");
  }

  return request({
    url: API_BASE_URL + "/user/me",
    method: 'GET'
  });
}

const request = (options) => {
  const headers = new Headers({
    'Content-Type': 'application/json',
  });

  if(localStorage.getItem(ACCESS_TOKEN)) {
    headers.append('Authorization', 'Bearer ' + localStorage.getItem(ACCESS_TOKEN))
  }

  const defaults = {headers: headers};
  options = Object.assign({}, defaults, options);

  return fetch(options.url, options)
    .then(response =>
      response.json().then(json => {
        if(!response.ok) {
          return Promise.reject(json);
        }
        return json;
      })
    );
};