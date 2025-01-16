import apiClient from '../api';

export const getProducts = () => apiClient.get('/products');

// export const getUserById = (id) => apiClient.get(`/users/${id}`);

// export const createUser = (data) => apiClient.post('/users', data);

// export const updateUser = (id, data) => apiClient.put(`/users/${id}`, data);

// export const deleteUser = (id) => apiClient.delete(`/users/${id}`);
