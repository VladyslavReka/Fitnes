import { createSlice } from '@reduxjs/toolkit';
import {
    getAllTrainings,
    addTraining,
    getTrainingById,
    updateTraining,
    deleteTraining,
    searchTrainings,
    completeTraining,
    getCompletedTrainings,
    getTrainingsByDate,
    getTrainingsByPeriod,
    getTrainingsByTrainerAndPeriod,
    getTrainingsByClientAndPeriod,
    getTrainingsByClient,
    getTrainingsByTrainer,
} from '../thunks/TrainingThunks';

const initialState = {
    trainingList: [],
    currentTraining: null,
    status: 'idle',
    error: null,
};

const trainingSlice = createSlice({
    name: 'trainings',
    initialState,
    reducers: {
        resetCurrentTraining(state) {
            state.currentTraining = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllTrainings.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getAllTrainings.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.trainingList = Array.isArray(action.payload) ? action.payload : [];
            })
            .addCase(getAllTrainings.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })
            .addCase(addTraining.fulfilled, (state, action) => {
                if (Array.isArray(state.trainingList)) {
                    state.trainingList.push(action.payload);
                }
            })
            .addCase(getTrainingById.fulfilled, (state, action) => {
                state.currentTraining = action.payload;
            })
            .addCase(updateTraining.fulfilled, (state, action) => {
                if (Array.isArray(state.trainingList)) {
                    const index = state.trainingList.findIndex(
                        (training) => training.id === action.payload.id
                    );
                    if (index !== -1) {
                        state.trainingList[index] = action.payload;
                    }
                }
            })
            .addCase(deleteTraining.fulfilled, (state, action) => {
                if (Array.isArray(state.trainingList)) {
                    state.trainingList = state.trainingList.filter(
                        (training) => training.id !== action.payload
                    );
                }
            })
            .addCase(searchTrainings.pending, (state) => { 
                state.isLoading = true; }) 
            .addCase(searchTrainings.fulfilled, (state, action) => { 
                state.isLoading = false; 
                state.trainingList = action.payload.trainings; 
                state.totalTrainings = action.payload.total; }) 
            .addCase(searchTrainings.rejected, (state, action) => { 
                state.isLoading = false; 
                state.error = action.payload; })
            .addCase(completeTraining.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(completeTraining.fulfilled, (state, action) => {
                state.status = 'succeeded';
                if (Array.isArray(state.trainingList)) {
                    const index = state.trainingList.findIndex(
                        (training) => training.id === action.payload.id
                    );
                    if (index !== -1) {
                        state.trainingList[index] = action.payload; // Оновлюємо тренування після завершення
                    }
                }
            })
            .addCase(completeTraining.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })
            // Звітність: тренування за датою
            .addCase(getTrainingsByDate.fulfilled, (state, action) => {
                state.trainingList = Array.isArray(action.payload) ? action.payload : [];
            })
            // Звітність: тренування за періодом
            .addCase(getTrainingsByPeriod.fulfilled, (state, action) => {
                state.trainingList = Array.isArray(action.payload) ? action.payload : [];
            })
            // Звітність: тренування за тренером за період
            .addCase(getTrainingsByTrainerAndPeriod.fulfilled, (state, action) => {
                state.trainingList = Array.isArray(action.payload) ? action.payload : [];
            })
            // Звітність: тренування за клієнтом за період
            .addCase(getTrainingsByClientAndPeriod.fulfilled, (state, action) => {
                state.trainingList = Array.isArray(action.payload) ? action.payload : [];
            })
            // Звітність: завершені тренування за період
            .addCase(getCompletedTrainings.fulfilled, (state, action) => {
                state.trainingList = Array.isArray(action.payload) ? action.payload : [];
            })
            .addCase(getTrainingsByClient.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getTrainingsByClient.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.trainingList = Array.isArray(action.payload) ? action.payload : [];
            })
            .addCase(getTrainingsByClient.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })
            .addCase(getTrainingsByTrainer.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getTrainingsByTrainer.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.trainingList = Array.isArray(action.payload) ? action.payload : [];
            })
            .addCase(getTrainingsByTrainer.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            });
    },
});

export const { resetCurrentTraining } = trainingSlice.actions;
export default trainingSlice.reducer;

