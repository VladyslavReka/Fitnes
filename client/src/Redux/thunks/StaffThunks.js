import { createAsyncThunk } from '@reduxjs/toolkit';
import StaffService from '../services/StaffService';

// Отримати всіх співробітників
export const getAllStaff = createAsyncThunk(
    'staff/getAllStaff',
    async (_, { rejectWithValue }) => {
        try {
            const { data } = await StaffService.getAllStaff();
            return data;
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    }
);

// Отримати співробітника за ID
export const getStaffById = createAsyncThunk(
    'staff/getStaffById',
    async (id, { rejectWithValue }) => {
        try {
            const { data } = await StaffService.getStaffById(id);
            return data;
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    }
);

// Оновити співробітника
export const updateStaff = createAsyncThunk(
    'staff/updateStaff',
    async ({ id, staffData }, { rejectWithValue }) => {
        try {
            const { data } = await StaffService.updateStaff(id, staffData);
            return data;
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    }
);

// Видалити співробітника
export const deleteStaff = createAsyncThunk(
    'staff/deleteStaff',
    async (id, { rejectWithValue }) => {
        try {
            await StaffService.deleteStaff(id);
            return id; // Повертаємо ID для локального видалення
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    }
);

// Пошук співробітників
export const searchStaff = createAsyncThunk(
    'staff/searchStaff',
    async (queryParams, { rejectWithValue }) => {
        try {
            const { data } = await StaffService.searchStaff(queryParams);
            return data;
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    }
);

// Отримати співробітників за спеціалізацією
export const getStaffBySpecialization = createAsyncThunk(
    'staff/getStaffBySpecialization',
    async (specialization, { rejectWithValue }) => {
        try {
            const { data } = await StaffService.getStaffBySpecialization(specialization);
            return data;
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    }
);