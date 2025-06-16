import axios from "axios";

const apiClient = axios.create({
  baseURL: process.env.REACT_APP_NODE_BACKEND_URL||"https://api-pms.pillsphere.com/api/v1/",
  headers: {
    "Content-Type": "application/json",
  },
});

export const createPayment = (data) => apiClient.post(`payment`, data);
export const verifyPayment = (data) => apiClient.post(`payment/verify`, data);
export const getTransactionInfo = (id) => apiClient.get(`payment/${id}`);
