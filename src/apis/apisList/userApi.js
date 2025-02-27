import apiClient from "../api";

// export const loginUser = (data) => apiClient.post('/wp-json/wp/v2/login', data);
// export const registerUser = (data) => apiClient.post('/wp-json/wp/v2/register', data);
export const loginUser = (data) =>
  fetch("/wp-json/wp/v2/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
export const registerUser = (data) =>
  fetch("/wp-json/wp/v2/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
export const verifyOtp = (data) =>
  fetch("/wp-json/wp/v2/verify-otp", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
