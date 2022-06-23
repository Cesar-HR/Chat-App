import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  message: [],
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

export const msgReducer = createSlice({
  name: "@message",
  initialState,
  reducers: {
    send_message: (state, action) => {
      state.message = action.payload;
    },
    received_message: (state, action) => {
      state.message = action.payload;
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
  send_message,
  received_message,
  set_loading,
  set_not_loading,
  error,
  success,
  reset,
} = msgReducer.actions;

export default msgReducer.reducer;
