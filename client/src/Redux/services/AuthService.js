import axios from '../axios.js';

class AuthService {
    // Реєстрація нового співробітника
    register(staffData) {
        return axios.post('/auth/register', staffData);
    }

    // Логін співробітника
    login(email, password) {
        return axios.post('/auth/login', { email, password });
    }

    // Отримання інформації про себе
    getMe() {
        const token = window.localStorage.getItem('token');
        if (!token) throw new Error('No token found');
        return axios.get('/auth/me', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }); // Вимагає передати токен у заголовку
    }
}

export default new AuthService();