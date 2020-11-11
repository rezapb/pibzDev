import { LOGOUT_SUCCESS, CLEAR_PROFILE } from "./types";

const clearProfile = () => {
  return {
    type: CLEAR_PROFILE,
  };
};

const logoutSuccess = () => {
  return {
    type: LOGOUT_SUCCESS,
  };
};

export const logout = () => {
  return async (dispatch) => {
    dispatch(clearProfile());
    dispatch(logoutSuccess());
  };
};
