import axios from 'axios';
import authHeader from './auth-header';
import { API_ROOT } from '../utils/constants';

export const createClassroom = async (data) => {
  const req = await axios.post(`${API_ROOT}/classroom/create`, data, { headers: authHeader() });
  return req.data;
};

export const getClassrooms = async (userId) => {
  const req = await axios.get(`${API_ROOT}/classroom/get/by-user/${userId}`, { headers: authHeader() });
  return req.data;
};

export const getClassroomManage = async (userId) => {
  const req = await axios.get(`${API_ROOT}/classroom/get/by-moderator/${userId}`, { headers: authHeader() });
  return req.data;
};


export const getClassroomById = async (id) => {
  const req = await axios.get(`${API_ROOT}/classroom/${id}`, { headers: authHeader() });
  return req.data;
};

export const getClassroomPeople = async (id) => {
  const req = await axios.get(`${API_ROOT}/classroom/${id}/people`, { headers: authHeader() });
  return req.data;
}

export const getClassroomNotifications = async (id) => {
  const req = await axios.get(`${API_ROOT}/classroom/${id}/notifications`, { headers: authHeader() });
  return req.data;
}

export const createClassroomNotifications = async (classroomId, data) => {
  const req = await axios.post(`${API_ROOT}/classroom/${classroomId}/notification/create`, data, { headers: authHeader() });
  return req.data;
}


