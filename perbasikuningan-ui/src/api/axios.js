import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:3000/api', // Sesuaikan dengan port backend Anda
});

// Interceptor untuk menempelkan token JWT di setiap request jika sudah login
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default api;