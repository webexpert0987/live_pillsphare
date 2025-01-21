// import apiClient from '../api';
import axios from 'axios';

const apiClient = axios.create({
//   baseURL: 'http://admin.pillsphere.com/wp-json/wp/v2',
  // baseURL: process.env.REACT_APP_BACKEND_URL,
  baseURL: '',
  headers: {
    'Content-Type': 'application/json',
  },
});
export const loginUser = (data) => apiClient.post('/wp-json/wp/v2/login', data);
export const registerUser = (data) => apiClient.post('/wp-json/wp/v2/register', data);
