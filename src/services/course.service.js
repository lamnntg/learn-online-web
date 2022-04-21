import axios from 'axios';
import authHeader from './auth-header';
import { API_ROOT } from '../utils/constants';

const url = 'https://api-gateway.fullstack.edu.vn/api/courses';

export const getCourse = async path => {
  // const req = await axios.get(`${url}/${path}`, { headers: authHeader() });
  // console.log(req);
  // return req.data;
  return true;
};

