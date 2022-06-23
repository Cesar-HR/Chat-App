import axios from "axios";

import {
  avatarRouter,
  loginRouter,
  registerRouter,
} from "../../config/routes/endpoints";
import { getStorageItem, setStorageItem } from "../../utils/localStorage";

import {
  error,
  login,
  register,
  reset,
  set_avatar,
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

export const signinUser = ({ username, password }) => {
  return async (dispatch) => {
    dispatch(reset());
    dispatch(set_loading());

    try {
      const { data } = await axios.post(loginRouter, {
        username,
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

        return dispatch(login(data.data));
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

export const setAvatarPicture = (avatarPicture) => {
  return async (dispatch) => {
    dispatch(reset());
    dispatch(set_loading());

    try {
      const currentUser = await JSON.parse(
        getStorageItem(process.env.REACT_APP_LOCALSTORAGE_KEY)
      );
      const { data } = await axios.post(`${avatarRouter}/${currentUser._id}`, {
        image: avatarPicture,
      });

      if (data.status) {
        dispatch(set_not_loading());

        dispatch(
          success({
            status: data.status,
            message: data.message,
          })
        );

        if (data.data.isAvatarImageSet) {
          currentUser.isAvatarImageSet = true;
          currentUser.avatarImage = data.data.avatarImage;
          setStorageItem(process.env.REACT_APP_LOCALSTORAGE_KEY, currentUser);
        }

        return dispatch(set_avatar(data.data));
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
