import { createSlice } from '@reduxjs/toolkit';
import { register, login, fetchCurrentUser } from '../thunks/AuthThunks';

const initialState = {
  user: null,
  token: window.localStorage.getItem('token') || null,
  isLoading: false,
  status: null,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser(state, action) {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    logout(state) {
      state.staff = null;
      state.token = null;
    },
  },
  extraReducers: (builder) => {
    builder
        .addCase(register.pending, (state) => {
            state.status = 'loading';
        })
        .addCase(register.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.staff = action.payload;
        })
        .addCase(register.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.payload;
        })
        .addCase(login.pending, (state) => {
          state.isLoading = true;
          state.status = null;
        })
        .addCase(login.fulfilled, (state, action) => {
          state.isLoading = false;
          state.status = action.payload.message;
            state.token = action.payload.token;
            state.user = action.payload.user;
            window.localStorage.setItem('token', action.payload.token);
        })
        .addCase(login.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.payload;
        })
        .addCase(fetchCurrentUser.pending, (state) => {
          state.isLoading = true;
        })
        .addCase(fetchCurrentUser.fulfilled, (state, action) => {
          state.isLoading = false;
          state.user = action.payload;
          console.log('State user:', state.user);
        })
        .addCase(fetchCurrentUser.rejected, (state, action) => {
          state.isLoading = false;
          state.status = action.payload;
        });
      },
    });

export const { logout, setUser } = authSlice.actions;
export const checkIsAuth = (state) => Boolean(state.auth.token);
export default authSlice.reducer;