import axios from "axios";
import authHeader from "./auth-header";
import { API_ROOT, CONVERT_API_SECRET_KEY } from "../utils/constants";

export const createClassroom = async (data) => {
  const req = await axios.post(`${API_ROOT}/classroom/create`, data, {
    headers: authHeader(),
  });
  return req.data;
};

export const getHomework = async (classId) => {
  const req = await axios.get(
    `${API_ROOT}/homework/get/by-classroom/${classId}`,
    { headers: authHeader() }
  );
  return req.data;
};

export const getHomeworkDetail = async (homeworkId) => {
  const req = await axios.get(`${API_ROOT}/homework/${homeworkId}`, {
    headers: authHeader(),
  });
  return req.data;
};

export const createHomework = async (data) => {
  const req = await axios.post(`${API_ROOT}/homework/create`, data, {
    headers: authHeader(),
  });

  return req.data;
};

export const finishHomework = async (homeworkId, data) => {
  const req = await axios.post(
    `${API_ROOT}/homework/${homeworkId}/finish`,
    data,
    { headers: authHeader() }
  );

  return req.data;
};

export const getResultHomework = async (homeworkId) => {
  const req = await axios.get(`${API_ROOT}/homework/${homeworkId}/result`, {
    headers: authHeader(),
  });

  return req.data;
};

export const createExamPDF = async (data) => {
  const req = await axios.post(`${API_ROOT}/homework/create/by-pdf`, data, {
    headers: authHeader(),
  });

  return req.data;
};

export const uploadPDF = async (data) => {
  const req = await axios.post(
    `https://v2.convertapi.com/convert/pdf/to/png?Secret=${CONVERT_API_SECRET_KEY}&StoreFile=true`,
    data
  );
  return req.data;
};

export const updateHomework = async (id, data) => {
  const req = await axios.post(`${API_ROOT}/homework/${id}/update`, data, {
    headers: authHeader(),
  });

  return req.data;
};

export const deleteHomework = async (id) => {
  const req = await axios.post(
    `${API_ROOT}/homework/delete`,
    { id: id },
    { headers: authHeader() }
  );

  return req.data;
};
