import axios from "axios";
import { alert } from "./alertAction";
import {
  GET_PROFILE_SUCCESS,
  GET_PROFILE_FAILURE,
  CLEAR_PROFILE,
} from "./types";

const getProfileSuccess = (data) => {
  return {
    type: GET_PROFILE_SUCCESS,
    payload: data,
  };
};

const getProfilefailure = (errors) => {
  return {
    type: GET_PROFILE_FAILURE,
    payload: errors,
  };
};

// Get current user profile
export const getProfile = () => {
  return async (dispatch) => {
    try {
      const res = await axios.get("/profiles/current");
      dispatch(getProfileSuccess(res.data));
    } catch (error) {
      dispatch(getProfilefailure(error));
    }
  };
};

// Clear last profile
const clearProfile = () => {
  return {
    type: CLEAR_PROFILE,
  };
};

export const clearLastProfile = () => {
  return async (dispatch) => {
    dispatch(clearProfile());
  };
};

// Get profile by Id
export const getProfileById = (id) => {
  return async (dispatch) => {
    try {
      const res = await axios.get(`/profiles/${id}`);
      dispatch(getProfileSuccess(res.data));
    } catch (error) {
      dispatch(getProfilefailure(error));
    }
  };
};

// Create or Edit profile
export const editProfile = (formData, history) => {
  return async (dispatch) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const res = await axios.post("/profiles", formData, config);

      dispatch(getProfileSuccess(res.data));

      // Send Alert
      dispatch(alert([{ msg: "پروفایل آپدیت شد", severity: "success" }]));

      // Redirect after creating profile
      history.push("/dashboard");
    } catch (error) {
      const errors = error.response.data.errors;

      dispatch(alert(errors));
      dispatch(getProfilefailure(error));
    }
  };
};
