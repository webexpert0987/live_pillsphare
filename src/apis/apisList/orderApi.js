import apiClient from '../api';

export const createOrder = (data) => apiClient.post('/wp-json/wp/v2/order', data);
