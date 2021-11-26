import axios from 'axios';
import { API_ROOT } from './../../utils/constants';

export const fetchBoard = async (id) => {
  const req = await axios.get(`${API_ROOT}/v1/boards/${id}`);
  return req.data;
};

export const createClassroom = async (data) => {
  const req = await axios.put(`${API_ROOT}/classroom/create/`, data);
  return req.data;
};

export const createColumn = async (data) => {
  const req = await axios.post(`${API_ROOT}/v1/columns/create`, data);
  return req.data;
};

export const updateColumn = async (id, data) => {
  const req = await axios.put(`${API_ROOT}/v1/columns/update/${id}`, data);
  return req.data;
};

export const createCard = async (data) => {
  const req = await axios.post(`${API_ROOT}/v1/cards/create`, data);
  return req.data;
};

export const updateCard = async (id, data) => {
  const req = await axios.put(`${API_ROOT}/v1/cards/update/${id}`, data);
  return req.data;
};
