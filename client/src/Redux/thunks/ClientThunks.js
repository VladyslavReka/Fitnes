import { createAsyncThunk } from '@reduxjs/toolkit';
import ClientService from '../services/ClientService';

export const getAllClients = createAsyncThunk(
    'clients/getAllClients',
    async (_, { rejectWithValue }) => {
        try {
            const { data } = await ClientService.getAllClients();
            return data;
        } catch (error) {
            console.error('Error in getAllClients:', error);
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

export const addClient = createAsyncThunk(
    'clients/addClient',
    async (clientData, { rejectWithValue }) => {
        try {
            const { data } = await ClientService.addClient(clientData);
            return data;
        } catch (error) {
            console.error('Error in addClient:', error);
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

export const getClientById = createAsyncThunk(
    'clients/getClientById',
    async (id, { rejectWithValue }) => {
        try {
            const { data } = await ClientService.getClientById(id);
            return {
                ...data,
                membershipStatus: data.membershipStatus || 'unknown',
                membershipEndDate: data.membershipEndDate || null,
            };
        } catch (error) {
            console.error('Error in getClientById:', error);
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

export const updateClient = createAsyncThunk(
    'clients/updateClient',
    async ({ clientId, clientData }, { rejectWithValue }) => {
        try {
            const { data } = await ClientService.updateClient(clientId, clientData);
            return data;
        } catch (error) {
            console.error('Error in updateClient:', error);
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

export const deleteClient = createAsyncThunk(
    'clients/deleteClient',
    async (id, { rejectWithValue }) => {
        try {
            await ClientService.deleteClient(id);
            return id; // Повертаємо ID видаленого клієнта для подальшої обробки
        } catch (error) {
            console.error('Error in deleteClient:', error);
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

export const searchClients = createAsyncThunk(
    'clients/searchClients',
    async (searchParams, { rejectWithValue }) => {
        try {
            console.log('Executing searchClients thunk with params:', searchParams);
            const { data } = await ClientService.searchClients(searchParams);
            console.log('Received search results from server:', data);
            return data;
        } catch (error) {
            console.error('Error in searchClients:', error);
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);


export const extendMembership = createAsyncThunk(
    'clients/extendMembership',
    async (clientId, { rejectWithValue }) => {
        try {
            const { data } = await ClientService.extendMembership(clientId);
            return data;
        } catch (error) {
            console.error('Error in extendMembership:', error);
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

// Зміна типу членства
export const changeMembership = createAsyncThunk(
    'clients/changeMembership',
    async ({ clientId, newMembershipId }, { rejectWithValue }) => {
        try {
            const { data } = await ClientService.changeMembership(clientId, newMembershipId);
            return data;
        } catch (error) {
            console.error('Error in changeMembership:', error);
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);