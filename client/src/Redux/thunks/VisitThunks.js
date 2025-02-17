import { createAsyncThunk } from "@reduxjs/toolkit";
import VisitService from "../services/VisitService";

export const addVisit = createAsyncThunk(
  "visits/addVisit",
  async (visitData, { rejectWithValue }) => {
    try {
      const response = await VisitService.addVisit(visitData);
      console.log(response);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const findVisitById = createAsyncThunk(
  "visits/findVisitById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await VisitService.findVisitById(id);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const updateVisit = createAsyncThunk(
  "visits/updateVisit",
  async ({ id, visitData }, { rejectWithValue }) => {
    try {
      const response = await VisitService.updateVisit(id, visitData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const deleteVisit = createAsyncThunk(
  "visits/deleteVisit",
  async (id, { rejectWithValue }) => {
    try {
      await VisitService.deleteVisit(id);
      return id;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const getVisitByTrainingId = createAsyncThunk(
  "visits/getVisitByTrainingId",
  async (trainingId, { rejectWithValue }) => {
    try {
      const response = await VisitService.getVisitByTrainingId(trainingId);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// export const listAllVisits = createAsyncThunk(
//   "visits/listAllVisits",
//   async (_, { rejectWithValue }) => {
//     try {
//       const response = await VisitService.listAllVisits();
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(error.response?.data || error.message);
//     }
//   }
// );

// export const getVisitsByClient = createAsyncThunk(
//   "visits/getVisitsByClient",
//   async (clientId, { rejectWithValue }) => {
//     try {
//       const response = await VisitService.getVisitsByClient(clientId);
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(error.response?.data || error.message);
//     }
//   }
// );


// export const getVisitsByDate = createAsyncThunk(
//   "visits/getVisitsByDate",
//   async (date, { rejectWithValue }) => {
//     try {
//       const response = await VisitService.getVisitsByDate(date);
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(error.response?.data || error.message);
//     }
//   }
// );

// export const getVisitsByPeriod = createAsyncThunk(
//   "visits/getVisitsByPeriod",
//   async ({ startDate, endDate }, { rejectWithValue }) => {
//     try {
//       const response = await VisitService.getVisitsByPeriod(startDate, endDate);
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(error.response?.data || error.message);
//     }
//   }
// );

// export const generateVisitReport = createAsyncThunk(
//   "visits/generateVisitReport",
//   async ({ startDate, endDate }, { rejectWithValue }) => {
//     try {
//       const response = await VisitService.generateVisitReport(startDate, endDate);
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(error.response?.data || error.message);
//     }
//   }
// );