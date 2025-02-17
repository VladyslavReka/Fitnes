import { createAsyncThunk } from '@reduxjs/toolkit';
import TrainingService from '../services/TrainingService';

// Отримати всі заняття
export const getAllTrainings = createAsyncThunk(
    'trainings/getAllTrainings',
    async (_, { rejectWithValue }) => {
        try {
            const { data } = await TrainingService.getAllTrainings();
            return data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

// Додати нове заняття
export const addTraining = createAsyncThunk(
    'trainings/addTraining',
    async (trainingData, { rejectWithValue }) => {
        try {
            const { data } = await TrainingService.addTraining(trainingData);
            console.log(data);
            return data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

// Отримати заняття за ID
export const getTrainingById = createAsyncThunk(
    'trainings/getTrainingById',
    async (id, { rejectWithValue }) => {
        try {
            const { data } = await TrainingService.getTrainingById(id);
            return data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

// Оновити заняття
export const updateTraining = createAsyncThunk(
    'trainings/updateTraining',
    async ({ id, trainingData }, { rejectWithValue }) => {
        try {
            console.log('Updating training Id:' + id);
            const { data } = await TrainingService.updateTraining(id, trainingData);
            return data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const completeTraining = createAsyncThunk(
    'trainings/completeTraining',
    async (trainingId, { rejectWithValue }) => {
        try {
            const {data} = await TrainingService.completeTraining(trainingId);
            return data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

// Видалити заняття
export const deleteTraining = createAsyncThunk(
    'trainings/deleteTraining',
    async (id, { rejectWithValue }) => {
        try {
            await TrainingService.deleteTraining(id);
            return id;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

// Пошук занять за параметрами
export const searchTrainings = createAsyncThunk(
    'trainings/searchTrainings',
    async (queryParams, { rejectWithValue }) => {
        try {
            const { data } = await TrainingService.searchTrainings(queryParams);
            return data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

// Звітність: тренування за датою
export const getTrainingsByDate = createAsyncThunk(
    'trainings/getTrainingsByDate',
    async (date, { rejectWithValue }) => {
        try {
            const { data } = await TrainingService.getTrainingsByDate(date);
            return data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

// Звітність: тренування за періодом
export const getTrainingsByPeriod = createAsyncThunk(
    'trainings/getTrainingsByPeriod',
    async ({ startDate, endDate }, { rejectWithValue }) => {
        try {
            const { data } = await TrainingService.getTrainingsByPeriod(startDate, endDate);
            return data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

// Звітність: тренування за тренером за період
export const getTrainingsByTrainerAndPeriod = createAsyncThunk(
    'trainings/getTrainingsByTrainerAndPeriod',
    async ({ trainerId, startDate, endDate }, { rejectWithValue }) => {
        try {
            const { data } = await TrainingService.getTrainingsByTrainerAndPeriod(trainerId, startDate, endDate);
            return data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

// Звітність: тренування за клієнтом за період
export const getTrainingsByClientAndPeriod = createAsyncThunk(
    'trainings/getTrainingsByClientAndPeriod',
    async ({ clientId, startDate, endDate }, { rejectWithValue }) => {
        try {
            const { data } = await TrainingService.getTrainingsByClientAndPeriod(clientId, startDate, endDate);
            return data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

// Звітність: завершені тренування за період
export const getCompletedTrainings = createAsyncThunk(
    'trainings/getCompletedTrainings',
    async ({ startDate, endDate }, { rejectWithValue }) => {
        try {
            const { data } = await TrainingService.getCompletedTrainings(startDate, endDate);
            return data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

// Отримати тренування за клієнтом
export const getTrainingsByClient = createAsyncThunk(
    'trainings/getTrainingsByClient',
    async (clientId, { rejectWithValue }) => {
      try {
        const { data } = await TrainingService.getTrainingsByClient(clientId);
        return data;
      } catch (error) {
        return rejectWithValue(error.response.data);
      }
    }
  );
  
  // Отримати тренування за тренером
  export const getTrainingsByTrainer = createAsyncThunk(
    'trainings/getTrainingsByTrainer',
    async (trainerId, { rejectWithValue }) => {
      try {
        const { data } = await TrainingService.getTrainingsByTrainer(trainerId);
        return data;
      } catch (error) {
        return rejectWithValue(error.response.data);
      }
    }
  );