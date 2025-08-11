import axios from 'axios';

const BASE_URL = process.env.REACT_APP_API_BASE_URL || 'https://music.tinasoft.io/api/v1';

const axiosInstance = axios.create({
    baseURL: BASE_URL,
    timeout: 15000,
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
    },
});

// Request interceptor: thêm token auth nếu có
axiosInstance.interceptors.request.use(
    config => {
        const token = localStorage.getItem('access_token'); // hoặc store app
        if (token) config.headers.Authorization = `Bearer ${token}`;
        return config;
    },
    error => Promise.reject(error)
);

// Response interceptor: xử lý lỗi chung (401 refresh token, logging, toast...)
axiosInstance.interceptors.response.use(
    res => res,
    async error => {
        // ví dụ: nếu 401 => thử refresh token (tùy backend có hỗ trợ)
        // const original = error.config;
        // if (error.response?.status === 401 && !original._retry) { ... }
        return Promise.reject(error);
    }
);

export default axiosInstance;
