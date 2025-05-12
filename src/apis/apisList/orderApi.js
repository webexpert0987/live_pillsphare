import apiClient from '../api';

export const createOrder = (data) => apiClient.post('/wp-json/wp/v2/order', data);
export const rateProduct = (data) => apiClient.post('/wp-json/wp/v2/rate-product', data);
export const fetchOrders = (userId) => apiClient.get(`/wp-json/wp/v2/orders/${userId}`);
export const orderEligibility = (data) => apiClient.post(`/wp-json/wp/v2/order-eligibility/`, data);
export const reviewProductData = (data) => apiClient.post(`/wp-json/wp/v2/get-product-reviews`, data);
export const getShippingMethods = (data) => apiClient.get(`/wp-json/wp/v2/shipping-classes`, data);