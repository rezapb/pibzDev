import {
  AUTH_SUCCESS,
  AUTH_FAILURE,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT_SUCCESS,
  LOGOUT_FAILURE,
} from './../actions/types';

const initialState = {
  token: localStorage.getItem('token'),
  isAuth: null,
  loading: true,
  verified: null,
  user: null,
  errors: [],
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case AUTH_SUCCESS:
      return {
        ...state,
        isAuth: true,
        loading: false,
        user: action.payload,
        verified: action.payload.verified,
      };
    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
      localStorage.setItem('token', action.payload.token);
      return {
        ...state,
        ...action.payload,
        isAuth: true,
        loading: false,
        user: action.payload,
      };
    case AUTH_FAILURE:
    case REGISTER_FAILURE:
    case LOGIN_FAILURE:
    case LOGOUT_SUCCESS:
      localStorage.removeItem('token');
      return {
        ...state,
        token: null,
        isAuth: false,
        verified: false,
        loading: true,
        user: null,
        errors: action.payload,
      };
    default:
      return state;
  }
};

export default authReducer;
