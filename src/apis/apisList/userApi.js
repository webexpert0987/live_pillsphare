import apiClient from '../api';

export const loginUser = (data) => apiClient.post('/wp-json/wp/v2/login', data);
export const registerUser = (data) => apiClient.post('/wp-json/wp/v2/register', data);
