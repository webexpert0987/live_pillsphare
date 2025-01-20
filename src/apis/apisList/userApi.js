import axios from 'axios';

const apiClient = axios.create({
  baseURL: '', // This will be automatically proxied via package.json setting
  headers: {
    'Content-Type': 'application/json',
  },
});

export const loginUser = (data) => apiClient.post('/wp-json/wp/v2/login', data);
export const registerUser = (data) => apiClient.post('/wp-json/wp/v2/register', data);
