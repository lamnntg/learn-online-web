import axios from "axios";
import authHeader from "./auth-header";
import { API_URL, API_ROOT } from "../utils/constants";

const getPublicContent = () => {
  return axios.get(API_URL + "all");
};

const getUserBoard = () => {
  return axios.get(API_URL + "user", { headers: authHeader() });
};

const getModeratorBoard = () => {
  return axios.get(API_URL + "mod", { headers: authHeader() });
};

const getAdminBoard = () => {
  return axios.get(API_URL + "admin", { headers: authHeader() });
};

const updateUser = (id, data) => {
  return axios.put(`${API_ROOT}/user/${id}/update`, data, {
    headers: authHeader(),
  });
};

const uploadAvatar = async (data) => {
  const req = await axios.post(`${API_ROOT}/user/avatar/update`, data, {
    headers: { ...authHeader(), "Content-Type": "application/json" },
  });

  return req.data;
};

const getUserById = (id) => {
  return axios.get(`${API_ROOT}/user/${id}`, {
    headers: authHeader(),
  });
};

const getClassroomInvite = (email) => {
  return axios.post(
    `${API_ROOT}/user/get-invite`,
    { email: email },
    {
      headers: authHeader(),
    }
  );
};

const submitInvite = (data) => {
  return axios.post(`${API_ROOT}/user/submit-invite`, data, {
    headers: authHeader(),
  });
};

export const userService = {
  getPublicContent,
  getUserBoard,
  getModeratorBoard,
  getAdminBoard,
  uploadAvatar,
  updateUser,
  getUserById,
  getClassroomInvite,
  submitInvite,
};
