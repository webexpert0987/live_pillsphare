import apiClient from '../api';

export const createPaymentIntent = (data) => apiClient.post(`/wp-json/wp/v2/create-payment-intent`, data);
