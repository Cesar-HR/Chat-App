import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: [],
  loading: false,
  error: {
    status: false,
    message: "",
  },
  success: {
    status: false,
    message: "",
  },
};

export const userReducer = createSlice({
  name: "@user",
  initialState,
  reducers: {
    register: (state, action) => {
      state.user = action.payload;
    },
    login: (state, action) => {
      state.user = action.payload;
    },
    set_avatar: (state, action) => {
      state.user = action.payload;
    },
    set_loading: (state) => {
      state.loading = true;
    },
    set_not_loading: (state) => {
      state.loading = false;
    },
    error: (state, action) => {
      state.error = action.payload;
    },
    success: (state, action) => {
      state.success = action.payload;
    },
    reset: () => {
      return initialState;
    },
  },
});

export const {
  register,
  login,
  set_avatar,
  set_loading,
  set_not_loading,
  error,
  success,
  reset,
} = userReducer.actions;

export default userReducer.reducer;
