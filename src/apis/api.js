import axios from 'axios';

const apiClient = axios.create({
//   baseURL: 'http://admin.pillsphere.com/wp-json/wp/v2',
  baseURL: process.env.REACT_APP_BACKEND_URL,
  // baseURL: '',
  headers: {
    'Content-Type': 'application/json',
  },
});


// apiClient.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem('token');
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => Promise.reject(error)
// );

apiClient.interceptors.response.use(
  (response) => response.data,
  (error) => {
    console.error(error);
    return Promise.reject(error);
  }
);

export default apiClient;
