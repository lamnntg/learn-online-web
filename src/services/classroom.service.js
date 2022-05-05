import axios from 'axios';
import authHeader from './auth-header';
import { API_ROOT } from '../utils/constants';

export const createClassroom = async (data) => {
  const req = await axios.post(`${API_ROOT}/classroom/create`, data, { headers: authHeader() });
  return req.data;
};

export const joinClassroom = async (data) => {
  const req = await axios.post(`${API_ROOT}/classroom/join`, data, { headers: authHeader() });
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

// Classroom notificaitons
export const getClassroomNotifications = async (id) => {
  const req = await axios.get(`${API_ROOT}/classroom/${id}/notifications`, { headers: authHeader() });
  return req.data;
}

export const createClassroomNotifications = async (classroomId, data) => {
  const req = await axios.post(`${API_ROOT}/classroom/${classroomId}/notification/create`, data, { headers: authHeader() });
  return req.data;
}

export const updateClassroomNotifications = async (id, data) => {
  const req = await axios.put(`${API_ROOT}/classroom/notification/${id}/update`, data, { headers: authHeader() });
  return req.data;
}

export const deleteClassroomNotifications = async (id) => {
  const req = await axios.delete(`${API_ROOT}/classroom/notification/${id}/delete`, { headers: authHeader() });
  return req.data;
}

// classroom Documents
export const getClassroomDocuments = async (id) => {
  const req = await axios.get(`${API_ROOT}/classroom/${id}/documents`, { headers: authHeader() });
  return req.data;
}

export const createClassroomDocument = async (id, data) => {
  const req = await axios.post(`${API_ROOT}/classroom/${id}/document/create`, data, { headers: authHeader() });
  return req.data;
}

export const deleteClassroomDocument = async (id) => {
  const req = await axios.delete(`${API_ROOT}/classroom/document/${id}/delete`, { headers: authHeader() });
  return req.data;
}

export const importUserClassroom = async (classroomId, data) => {
  const req = await axios.post(`${API_ROOT}/classroom/${classroomId}/users/import`, data, { headers: authHeader() });
  return req.data;
}

export const getUsersPending= async (classroomId) => {
  const req = await axios.get(`${API_ROOT}/classroom/${classroomId}/get-users/pending`, { headers: authHeader() });
  
  return req.data;
}
