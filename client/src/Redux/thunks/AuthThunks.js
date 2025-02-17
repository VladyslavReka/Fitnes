import { createAsyncThunk } from '@reduxjs/toolkit';
import AuthService from '../services/AuthService';

// Реєстрація нового співробітника
export const register = createAsyncThunk(
    'auth/register',
    async (staffData, { rejectWithValue }) => {
        try {
            const { data } = await AuthService.register(staffData);
            return data; // Повертаємо зареєстрованого співробітника
        } catch (error) {
            console.error('Error in register:', error);
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

// Логін співробітника
export const login = createAsyncThunk(
    'auth/login',
    async ({ email, password }, { rejectWithValue }) => {
        try {
            const { data } = await AuthService.login(email, password);
            return data; // Повертаємо токен та інформацію про співробітника
        } catch (error) {
            console.error('Error in login:', error);
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

// Отримання інформації про поточного співробітника
export const fetchCurrentUser = createAsyncThunk(
  'auth/fetchCurrentUser',
  async (_, { rejectWithValue }) => {
    try {
      const token = window.localStorage.getItem('token');
      if (!token) throw new Error('No token found');

      const { data } = await AuthService.getMe();
      console.log('Fetched user data:', data); // Додати логування
      return data;
    } catch (error) {
      console.error('Error in fetchCurrentUser action:', error); // Додамо логування
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);