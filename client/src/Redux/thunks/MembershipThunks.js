import { createAsyncThunk } from '@reduxjs/toolkit';
import MembershipService from '../services/MembershipService';

// Отримати всі абонементи
export const getAllMemberships = createAsyncThunk(
    'memberships/getAllMemberships',
    async (_, { rejectWithValue }) => {
        try {
            const { data } = await MembershipService.getAllMemberships();
            return data;
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    }
);

// Додати новий абонемент
export const addMembership = createAsyncThunk(
    'memberships/addMembership',
    async (membershipData, { rejectWithValue }) => {
        try {
            const { data } = await MembershipService.addMembership(membershipData);
            return data;
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    }
);

// Отримати абонемент за ID
export const getMembershipById = createAsyncThunk(
    'memberships/getMembershipById',
    async (id, { rejectWithValue }) => {
        try {
            const { data } = await MembershipService.getMembershipById(id);
            return data;
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    }
);

// Оновити абонемент
export const updateMembership = createAsyncThunk(
    'memberships/updateMembership',
    async ({ id, membershipData }, { rejectWithValue }) => {
        try {
            const { data } = await MembershipService.updateMembership(id, membershipData);
            return data;
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    }
);

// Видалити абонемент
export const deleteMembership = createAsyncThunk(
    'memberships/deleteMembership',
    async (id, { rejectWithValue }) => {
        try {
            const { data } = await MembershipService.deleteMembership(id);
            return id; // Повертаємо ID, щоб можна було видалити з локального стану
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    }
);