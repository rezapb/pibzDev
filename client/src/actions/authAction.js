import axios from 'axios';
import { AUTH_SUCCESS, AUTH_FAILURE } from './types';

import setAuthToken from './../util/setAuthToken';

const loadSuccess = (data) => {
  return {
    type: AUTH_SUCCESS,
    payload: data,
  };
};

const loadFailure = (errors) => {
  return {
    type: AUTH_FAILURE,
    payload: errors,
  };
};

export const loadUser = () => {
  return async (dispatch) => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }

    try {
      const res = await axios.get('/users/current');
      dispatch(loadSuccess(res.data));
    } catch (error) {
      dispatch(loadFailure(error));
    }
  };
};
