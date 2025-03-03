import apiClient from '../api';

export const createOrder = (data) => apiClient.post('/wp-json/wp/v2/order', data);
export const fetchOrders = (userId) => apiClient.get(`/wp-json/wp/v2/orders/${userId}`);
export const orderEligibility = (data) => apiClient.post(`/wp-json/wp/v2/order-eligibility/`, data);