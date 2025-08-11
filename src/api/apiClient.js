import axios from 'axios';
const api = axios.create({
    baseURL: 'https://music.tinasoft.io/api/v1/swagger-ui/index.html#/',
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});
api.interceptors.request.use(config => {
    // ví dụ thêm token nếu có
    const token = localStorage.getItem('token');
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
}, err => Promise.reject(err));

api.interceptors.response.use(res => res, err => {
    // xử lý chung lỗi (logging, refresh token, ...)
    return Promise.reject(err);
});

export default api;
