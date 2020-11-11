import axios from "axios";
import { REGISTER_SUCCESS, REGISTER_FAILURE } from "./types";
import { alert } from "./alertAction";
import { loadUser } from "./authAction";

const registerSuccess = (data) => {
  return {
    type: REGISTER_SUCCESS,
    payload: { data },
  };
};

const registerFailure = (errors) => {
  return {
    type: REGISTER_FAILURE,
    payload: errors,
  };
};

export const register = ({ name, username, email, password }) => {
  return async (dispatch) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const body = JSON.stringify({ name, username, email, password });
    try {
      const res = await axios.post("/users/register", body, config);

      dispatch(registerSuccess(res.data)); // Can change to res to send all register data
      dispatch(loadUser());
    } catch (error) {
      const errors = error.response;
      const errMsg = error.response.data.errors;
      const isRegisteredErr = error.response.data;

      dispatch(registerFailure(errors));
      dispatch(alert([isRegisteredErr]));
      dispatch(alert(errMsg));
    }
  };
};
