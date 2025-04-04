import apiClient from "../api";

export const loginUser = (data) => apiClient.post("/wp-json/wp/v2/login", data);
export const registerUser = (data) =>
  apiClient.post("/wp-json/wp/v2/register", data);
export const verifyOtp = (data) =>
  apiClient.post("/wp-json/wp/v2/verify-otp", data);
export const checkIpBlockListed = (data) =>
  apiClient.post("/wp-json/wp/v2/blocked-ips", data);

export const uploadFile = async (file) => {
  const formData = new FormData();
  formData.append("file", file);

  try {
    const response = await apiClient.post("/wp-json/wp/v2/media", formData, {
      headers: {
        "Content-Disposition": `attachment; filename="${file.name}"`,
        "Content-Type": file.type, // Set file type dynamically
        Authorization: "Basic " + btoa("Shikar.kerim:Shikar@Frenchfish25"),
      },
    });

    console.log("Upload Successful:", response.data);
    return response.data;
  } catch (error) {
    console.error("Upload Error:", error.response?.data || error.message);
  }
};

export const subscribeNewsLetter = (data) =>
  apiClient.post("/wp-json/wp/v2/subscribe", data);

export const profile = (id) => apiClient.get(`/wp-json/wp/v2/user/${id}`);
export const profileUpdate = (id, data) =>
  apiClient.post(`/wp-json/wp/v2/user/${id}`, data);
export const sendOtp = (data) =>
  apiClient.post(`/wp-json/wp/v2/send-otp`, data);
export const resetPassword = (data) =>
  apiClient.post(`/wp-json/wp/v2/reset-password`, data);

export const blogApi = () => apiClient.get(`/wp-json/wp/v2/posts?_embed`);
export const getBlogDetail = (slug) => apiClient.get(`/wp-json/wp/v2/posts?slug=${slug}`);
