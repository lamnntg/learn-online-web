import axios from "axios";
import { API_URL, ROLE_MODERATOR } from "../utils/constants";

const login = (username, password) => {
  return axios
  .post(API_URL + "signin", {
    username,
    password
  })
  .then(response => {
    if (response.data.accessToken) {
      localStorage.setItem("user", JSON.stringify(response.data));
    }

    return response.data;
  });
}

const logout = () => {
  localStorage.removeItem("user");
}

const register = (name, username, email, password) => {
  return axios.post(API_URL + "signup", {
    name,
    username,
    email,
    password
  });
}

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem('user'));
}

const checkModerator = () => {
  return JSON.parse(localStorage.getItem('user')).roles.includes(ROLE_MODERATOR);

}

export const authService = { login, logout, register, getCurrentUser, checkModerator }