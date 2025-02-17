import { createSlice } from '@reduxjs/toolkit';
import {
    getAllClients,
    addClient,
    getClientById,
    updateClient,
    deleteClient,
    searchClients,
    extendMembership,
    changeMembership,
} from '../thunks/ClientThunks';

const initialState = {
    clients: [], // Список клієнтів
    currentClient: null, // Поточний клієнт
    status: 'idle', // Статус запитів
    error: null, // Помилки
};

const clientSlice = createSlice({
    name: 'client',
    initialState,
    reducers: {
        resetCurrentClient(state) {
            state.currentClient = null;
        },
    },
    extraReducers: (builder) => {
        builder
            // Отримання всіх клієнтів
            .addCase(getAllClients.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getAllClients.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.clients = Array.isArray(action.payload) ? action.payload : [];
            })
            .addCase(getAllClients.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })
            // Додавання нового клієнта
            .addCase(addClient.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(addClient.fulfilled, (state, action) => {
                state.status = 'succeeded';
                if (Array.isArray(state.clients)) {
                    state.clients.push(action.payload);
                }
            })
            .addCase(addClient.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })
            // Отримання клієнта за ID
            .addCase(getClientById.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getClientById.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.currentClient = action.payload;
            })
            .addCase(getClientById.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })
            // Оновлення клієнта
            .addCase(updateClient.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(updateClient.fulfilled, (state, action) => {
                state.status = 'succeeded';
                const index = state.clients.findIndex((c) => c.id === action.payload.id);
                if (index !== -1) {
                    state.clients[index] = action.payload;
                }
            })
            .addCase(updateClient.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })
            // Видалення клієнта
            .addCase(deleteClient.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(deleteClient.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.clients = state.clients.filter((c) => c.id !== action.payload);
            })
            .addCase(deleteClient.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })
            // Пошук клієнтів
            .addCase(searchClients.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(searchClients.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.clients = Array.isArray(action.payload) ? action.payload : [];
            })
            .addCase(searchClients.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })
            // Продовження членства
            .addCase(extendMembership.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(extendMembership.fulfilled, (state, action) => {
                state.status = 'succeeded';
                const index = state.clients.findIndex((c) => c.id === action.payload.id);
                if (index !== -1) {
                    state.clients[index] = action.payload;
                }
            })
            .addCase(extendMembership.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })
            // Зміна типу членства
            .addCase(changeMembership.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(changeMembership.fulfilled, (state, action) => {
                state.status = 'succeeded';
                const index = state.clients.findIndex((c) => c.id === action.payload.id);
                if (index !== -1) {
                    state.clients[index] = action.payload;
                }
            })
            .addCase(changeMembership.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            });
    },
});

export const { resetCurrentClient } = clientSlice.actions;
export default clientSlice.reducer;
