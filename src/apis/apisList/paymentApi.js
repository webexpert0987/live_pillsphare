import apiClient from '../api';

export const createPaymentIntent = (data) => apiClient.post(`/wp-json/wp/v2/create-payment-intent`, data);
export const getCouponCodes= (data) => apiClient.get(`/wp-json/wp/v2/coupons`);
