import axios from 'axios';
import authHeader from './auth-header';
import { API_ROOT } from '../utils/constants';

export const createClassroom = async (data) => {
  const req = await axios.post(`${API_ROOT}/classroom/create`, data, { headers: authHeader() });
  return req.data;
};

export const getHomework = async (userId) => {
  const req = await axios.get(`${API_ROOT}/classroom/get/by-user/${userId}`, { headers: authHeader() });
  return req.data;
};

export const getClassroomById = async (id) => {
  const req = await axios.get(`${API_ROOT}/classroom/${id}`, { headers: authHeader() });
  return req.data;
};

export const createHomework = async (data) => {
  const req = await axios.post(`${API_ROOT}/homework/create`, data, { headers: authHeader() });

  return req.data;
}