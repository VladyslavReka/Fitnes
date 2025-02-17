import { createSlice } from "@reduxjs/toolkit";
import {addVisit, findVisitById,
  updateVisit, deleteVisit, getVisitByTrainingId } from "../thunks/VisitThunks";

  const visitsSlice = createSlice({
    name: "visits",
    initialState: {
      visits: [], // Список відвідувань
      currentVisit: null, // Поточне відвідування (для деталізації або редагування)
      loading: false, // Стан завантаження
      error: null, // Помилка
    },
    reducers: {}, // Для синхронних дій (поки не використовуються)
    extraReducers: (builder) => {
      // Додавання нового відвідування
      builder
        .addCase(addVisit.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(addVisit.fulfilled, (state, action) => {
          state.loading = false;
          if (Array.isArray(state.visits)) {
            state.visits.push(action.payload);
          } else {
            state.visits = [action.payload];
          }
        })
        .addCase(addVisit.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload;
        });
  
      // Видалення відвідування
      builder
        .addCase(deleteVisit.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(deleteVisit.fulfilled, (state, action) => {
          state.loading = false;
          state.visits = state.visits.filter((visit) => visit.id !== action.payload);
        })
        .addCase(deleteVisit.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload;
        });
  
      // Отримання відвідування за ID
      builder
        .addCase(findVisitById.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(findVisitById.fulfilled, (state, action) => {
          state.loading = false;
          state.currentVisit = action.payload;
        })
        .addCase(findVisitById.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload;
        });
  
      // Оновлення відвідування
      builder
        .addCase(updateVisit.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(updateVisit.fulfilled, (state, action) => {
          state.loading = false;
          const index = state.visits.findIndex((visit) => visit.id === action.payload.id);
          if (index !== -1) {
            state.visits[index] = action.payload;
          }
        })
        .addCase(updateVisit.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload;
        });
  
      // Отримання відвідувань по ID тренування
      builder
        .addCase(getVisitByTrainingId.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(getVisitByTrainingId.fulfilled, (state, action) => {
          state.loading = false;
          if (Array.isArray(action.payload)) {
            state.visits = action.payload;
          } else {
            state.visits = [action.payload];
          }
        })
        .addCase(getVisitByTrainingId.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload;
        });
    },
  });
  
  export default visitsSlice.reducer;
  
  //// Отримання відвідувань за клієнтом
  // builder
  //   .addCase(thunks.getVisitsByClient.pending, (state) => {
  //     state.loading = true;
  //     state.error = null;
  //   })
  //   .addCase(thunks.getVisitsByClient.fulfilled, (state, action) => {
  //     state.loading = false;
  //     state.visits = action.payload;
  //   })
  //   .addCase(thunks.getVisitsByClient.rejected, (state, action) => {
  //     state.loading = false;
  //     state.error = action.payload;
  //   });

  // // Отримання відвідувань за тренером

  // // Отримання відвідувань за датою
  // builder
  //   .addCase(thunks.getVisitsByDate.pending, (state) => {
  //     state.loading = true;
  //     state.error = null;
  //   })
  //   .addCase(thunks.getVisitsByDate.fulfilled, (state, action) => {
  //     state.loading = false;
  //     state.visits = action.payload;
  //   })
  //   .addCase(thunks.getVisitsByDate.rejected, (state, action) => {
  //     state.loading = false;
  //     state.error = action.payload;
  //   });

  // // Отримання відвідувань за період
  // builder
  //   .addCase(thunks.getVisitsByPeriod.pending, (state) => {
  //     state.loading = true;
  //     state.error = null;
  //   })
  //   .addCase(thunks.getVisitsByPeriod.fulfilled, (state, action) => {
  //     state.loading = false;
  //     state.visits = action.payload;
  //   })
  //   .addCase(thunks.getVisitsByPeriod.rejected, (state, action) => {
  //     state.loading = false;
  //     state.error = action.payload;
  //   });

  // // Генерація звіту
  // builder
  //   .addCase(thunks.generateVisitReport.pending, (state) => {
  //     state.loading = true;
  //     state.error = null;
  //   })
  //   .addCase(thunks.generateVisitReport.fulfilled, (state, action) => {
  //     state.loading = false;
  //     // Тут можна обробити звіт (наприклад, зберегти його у state, якщо потрібно)
  //   })
  //   .addCase(thunks.generateVisitReport.rejected, (state, action) => {
  //     state.loading = false;
  //     state.error = action.payload;
  //   });