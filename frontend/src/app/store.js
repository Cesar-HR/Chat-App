import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./user/userReducer";
import msgReducer from "./message/msgReducer";

export default configureStore({
  reducer: {
    user: userReducer,
    message: msgReducer,
  },
});
