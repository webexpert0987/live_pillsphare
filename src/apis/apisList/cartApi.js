import apiClient from '../api';

export const getUserCart = (data) => apiClient.get(`/wp-json/wp/v2/cart/${data.user_id}`);
export const addProductToCart = (data) => apiClient.post('/wp-json/wp/v2/cart', data);
