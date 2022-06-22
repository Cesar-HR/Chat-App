import axios from "axios";

import { registerRouter } from "../../config/routes/endpoints";
import { setStorageItem } from "../../utils/localStorage";

import {
  error,
  register,
  reset,
  set_loading,
  set_not_loading,
  success,
} from "./userReducer";

export const createUser = ({ username, email, password }) => {
  return async (dispatch) => {
    dispatch(reset());
    dispatch(set_loading());

    try {
      const { data } = await axios.post(registerRouter, {
        username,
        email,
        password,
      });

      if (data.status) {
        dispatch(set_not_loading());

        dispatch(
          success({
            status: data.status,
            message: data.message,
          })
        );

        setStorageItem(process.env.REACT_APP_LOCALSTORAGE_KEY, data.data);

        return dispatch(register(data.data));
      } else {
        dispatch(set_not_loading());

        dispatch(
          error({
            status: true,
            message: data.message,
          })
        );
      }
    } catch (err) {
      dispatch(set_not_loading());

      if (err.code === "ERR_NETWORK") {
        dispatch(
          error({
            status: true,
            message: "Network Error. Try again later.",
          })
        );
      } else {
        dispatch(
          error({
            status: true,
            message: err.message,
          })
        );
      }
    }
  };
};
