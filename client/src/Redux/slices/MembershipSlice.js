import { createSlice } from '@reduxjs/toolkit';
import {
    getAllMemberships,
    addMembership,
    getMembershipById,
    updateMembership,
    deleteMembership,
} from '../thunks/MembershipThunks';

const initialState = {
    memberships: [],
    currentMembership: null,
    status: 'idle',
    error: null,
};

const membershipSlice = createSlice({
    name: 'memberships',
    initialState,
    reducers: {
        resetCurrentMembership(state) {
            state.currentMembership = null;
        },
    },
    extraReducers: (builder) => {
        builder
            // Отримання всіх абонементів
            .addCase(getAllMemberships.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getAllMemberships.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.memberships = action.payload;
            })
            .addCase(getAllMemberships.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })
            // Додавання нового абонемента
            .addCase(addMembership.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(addMembership.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.memberships.push(action.payload);
            })
            .addCase(addMembership.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })
            // Отримання абонемента за ID
            .addCase(getMembershipById.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getMembershipById.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.currentMembership = action.payload;
            })
            .addCase(getMembershipById.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })
            // Оновлення абонемента
            .addCase(updateMembership.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(updateMembership.fulfilled, (state, action) => {
                state.status = 'succeeded';
                const index = state.memberships.findIndex((m) => m.id === action.payload.id);
                if (index !== -1) {
                    state.memberships[index] = action.payload;
                }
            })
            .addCase(updateMembership.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })
            // Видалення абонемента
            .addCase(deleteMembership.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(deleteMembership.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.memberships = state.memberships.filter((m) => m.id !== action.payload);
            })
            .addCase(deleteMembership.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            });
    },
});

export const { resetCurrentMembership } = membershipSlice.actions;
export default membershipSlice.reducer;