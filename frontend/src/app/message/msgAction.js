import axios from "axios";

import {
  receivedMsgRouter,
  sendMsgRouter,
} from "../../config/routes/endpoints";

import {
  error,
  received_message,
  reset,
  send_message,
  set_loading,
  set_not_loading,
  success,
} from "./msgReducer";

export const sendMessage = (_userIdFrom, _userIdTo, message) => {
  return async (dispatch) => {
    dispatch(reset());
    dispatch(set_loading());

    try {
      const { data } = await axios.post(`${sendMsgRouter}`, {
        from: _userIdFrom,
        to: _userIdTo,
        msg: message,
      });

      if (data.status) {
        dispatch(set_not_loading());

        dispatch(
          success({
            status: data.status,
            message: data.message,
          })
        );

        return dispatch(send_message(data.response));
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

export const receivedMessage = (_userIdFrom, _userIdTo) => {
  return async (dispatch) => {
    dispatch(reset());
    dispatch(set_loading());

    try {
      const { data } = await axios.post(`${receivedMsgRouter}`, {
        from: _userIdFrom,
        to: _userIdTo,
      });

      if (data.status) {
        dispatch(set_not_loading());

        dispatch(
          success({
            status: data.status,
            message: data.message,
          })
        );

        return dispatch(received_message(data.dataInfo));
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
