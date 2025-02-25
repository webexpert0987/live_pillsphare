import apiClient from '../api';

export const getProducts = () => apiClient.get('/wp-json/wp/v2/products');

export const getProductBySlug = (slug) => apiClient.get(`/wp-json/wp/v2/products/${slug}`);

export const getCategoryBySlug = (slug) => 
    apiClient.get(`/wp-json/wp/v2/categories/${slug}`);

export const getShopCategories = () => apiClient.get('/wp-json/wp/v2/shopcategories/');

export const getProductImages = (productId) =>
    apiClient.get(`/wp-json/wp/v2/product-images/${productId}`);


export const getRelatedProduct = (productId) =>
    apiClient.get(`/wp-json/wp/v2/related-products/${productId}`);

export const getProductByCategory = (slug) => apiClient.get(`/wp-json/wp/v2/productsbycategory/${slug}`);


// export const createUser = (data) => apiClient.post('/users', data);

// export const updateUser = (id, data) => apiClient.put(`/users/${id}`, data);

// export const deleteUser = (id) => apiClient.delete(`/users/${id}`);
