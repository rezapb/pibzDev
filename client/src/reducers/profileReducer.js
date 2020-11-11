import {
  GET_PROFILE_SUCCESS,
  GET_PROFILE_FAILURE,
  CLEAR_PROFILE,
} from "./../actions/types";

const initialState = {
  profile: null,
  loading: true,
  errors: [],
};

const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_PROFILE_SUCCESS:
      return {
        ...state,
        loading: false,
        profile: action.payload,
      };
    case GET_PROFILE_FAILURE:
      return {
        ...state,
        loading: false,
        errors: action.payload,
      };
    case CLEAR_PROFILE:
      return {
        ...state,
        profile: null,
        loading: true,
      };
    default:
      return state;
  }
};

export default profileReducer;
