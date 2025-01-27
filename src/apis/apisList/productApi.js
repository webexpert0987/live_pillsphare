import apiClient from '../api';

export const getProducts = () => apiClient.get('/wp-json/wp/v2/products');

export const getProductById = (id) => apiClient.get(`/wp-json/wp/v2/products/${id}`);

export const getCategoryBySlug = (slug) => 
    apiClient.get(`/wp-json/wp/v2/categories/${slug}`);

export const getShopCategories = () => apiClient.get('/wp-json/wp/v2/shopcategories/');


// export const createUser = (data) => apiClient.post('/users', data);

// export const updateUser = (id, data) => apiClient.put(`/users/${id}`, data);

// export const deleteUser = (id) => apiClient.delete(`/users/${id}`);
