import axios from 'axios';
import authHeader from './auth-header';
import { API_ROOT } from '../utils/constants';

export const createClassroom = async (data) => {
  const req = await axios.post(`${API_ROOT}/classroom/create`, data, { headers: authHeader() });
  return req.data;
};

export const getHomework = async (classId) => {
  const req = await axios.get(`${API_ROOT}/homework/get/by-classroom/${classId}`, { headers: authHeader() });
  return req.data;
};

export const getHomeworkDetail = async (homeworkId) => {
  const req = await axios.get(`${API_ROOT}/homework/${homeworkId}`, { headers: authHeader() });
  return req.data;
};

export const createHomework = async (data) => {
  const req = await axios.post(`${API_ROOT}/homework/create`, data, { headers: authHeader() });

  return req.data;
}

export const finishHomework = async (homeworkId, data) => {
  const req = await axios.post(`${API_ROOT}/homework/${homeworkId}/finish`, data, { headers: authHeader() });

  return req.data;
}