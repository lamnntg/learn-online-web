import axios from 'axios';
import authHeader from './auth-header';
import { API_URL, API_ROOT } from '../utils/constants';

const getPublicContent = () => {
	return axios.get(API_URL + 'all');
};

const getUserBoard = () => {
	return axios.get(API_URL + 'user', { headers: authHeader() });
};

const getModeratorBoard = () => {
	return axios.get(API_URL + 'mod', { headers: authHeader() });
};

const getAdminBoard = () => {
	return axios.get(API_URL + 'admin', { headers: authHeader() });
};

const updateUser = (id, data) => {
	console.log(authHeader());
	return axios.put(`${API_ROOT}/user/${id}/update`, data, { headers: authHeader() });
};

const uploadAvatar = async (data) => {
	const req = await axios.post(`${API_ROOT}/user/avatar/update`, data, {
		headers: { ...authHeader(), 'Content-Type': 'application/json' },
	});

	return req.data;
};

export const userService = {
	getPublicContent,
	getUserBoard,
	getModeratorBoard,
	getAdminBoard,
	uploadAvatar,
	updateUser,
};
