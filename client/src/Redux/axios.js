import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://localhost:3001',
    validateStatus: () => true,
});

instance.interceptors.request.use((config) => {
    const token = window.localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default instance;