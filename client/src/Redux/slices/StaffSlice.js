import { createSlice } from '@reduxjs/toolkit';
import {
    getAllStaff,
    getStaffById,
    updateStaff,
    deleteStaff,
    searchStaff,
    getStaffBySpecialization,
} from '../thunks/StaffThunks';

const initialState = {
    staffList: [],
    currentStaff: null,
    status: 'idle',
    error: null,
};

const staffSlice = createSlice({
    name: 'staff',
    initialState,
    reducers: {
        resetCurrentStaff(state) {
            state.currentStaff = null;
        },
    },
    extraReducers: (builder) => {
        builder
            // Отримання всіх співробітників
            .addCase(getAllStaff.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getAllStaff.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.staffList = action.payload;
            })
            .addCase(getAllStaff.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })
            // Отримання співробітника за ID
            .addCase(getStaffById.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getStaffById.fulfilled, (state, action) => {
                state.status = 'succeeded';
                const index = state.staffList.findIndex((staff) => staff._id === action.payload._id);
                if (index !== -1) {
                    state.staffList[index] = action.payload;
                } else {
                    state.staffList.push(action.payload);
                }
            })
            .addCase(getStaffById.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })
            // Оновлення співробітника
            .addCase(updateStaff.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(updateStaff.fulfilled, (state, action) => {
                state.status = 'succeeded';
                const index = state.staffList.findIndex((s) => s.id === action.payload.id);
                if (index !== -1) {
                    state.staffList[index] = action.payload;
                }
            })
            .addCase(updateStaff.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })
            // Видалення співробітника
            .addCase(deleteStaff.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(deleteStaff.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.staffList = state.staffList.filter((s) => s.id !== action.payload);
            })
            .addCase(deleteStaff.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })
            // Пошук співробітників
            .addCase(searchStaff.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(searchStaff.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.staffList = action.payload;
            })
            .addCase(searchStaff.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })
            // Отримання співробітників за спеціалізацією
            .addCase(getStaffBySpecialization.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getStaffBySpecialization.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.staffList = action.payload;
            })
            .addCase(getStaffBySpecialization.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            });
    },
});

export const { resetCurrentStaff } = staffSlice.actions;
export default staffSlice.reducer;