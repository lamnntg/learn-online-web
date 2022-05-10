import axios from "axios";
import authHeader from "./auth-header";
import { API_ROOT } from "../utils/constants";

export const getAllQA = async () => {
  const req = await axios.get(`${API_ROOT}/qa/get/all`, {
    headers: authHeader(),
  });
  return req.data;
};

export const getAllQAByUserId = async (userId) => {
  const req = await axios.get(`${API_ROOT}/qa/get/by-user/${userId}`, {
    headers: authHeader(),
  });
  return req.data;
};

export const createQA = async (data) => {
  const req = await axios.post(`${API_ROOT}/qa/create`, data, {
    headers: { ...authHeader(), "Content-Type": "application/json" },
  });
  return req;
};

export const getQuestionByID = async (questionId) => {
  const req = await axios.get(`${API_ROOT}/qa/get/${questionId}`, {
    headers: authHeader(),
  });
  return req.data;
};

export const deleteQuestionById = async (questionId) => {
  const req = await axios.delete(`${API_ROOT}/qa/delete/${questionId}`, {
    headers: authHeader(),
  });
  return req.data;
};

export const updateQuestionById = async (questionID, data) => {
  const req = await axios.put(`${API_ROOT}/qa/${questionID}`, data, {
    headers: authHeader(),
  });
  return req.data;
};

export const getCommentByQaId = async (questionID) => {
  const req = await axios.get(`${API_ROOT}/qa/get-answers/${questionID}`, {
    headers: authHeader(),
  });
  return req.data;
};

export const postCommentByQaId = async (data) => {
  const req = await axios.post(`${API_ROOT}/qa/store-answers`, data, {
    headers: authHeader(),
  });
  return req.data;
};
