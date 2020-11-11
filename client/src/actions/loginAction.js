import axios from "axios";
import { LOGIN_SUCCESS, LOGIN_FAILURE } from "./types";
import { alert } from "./alertAction";
import { loadUser } from "./authAction";

const loginSuccess = (data) => {
  return {
    type: LOGIN_SUCCESS,
    payload: data,
  };
};

const loginFailure = (errors) => {
  return {
    type: LOGIN_FAILURE,
    payload: errors,
  };
};

export const login = ({ email, password }) => {
  return async (dispatch) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const body = JSON.stringify({ email, password });

    try {
      const res = await axios.post("/users/login", body, config);

      dispatch(loginSuccess(res.data));
      dispatch(loadUser());
    } catch (error) {
      const errors = error.response.data.errors;

      dispatch(alert(errors));
      dispatch(loginFailure(errors));
    }
  };
};
