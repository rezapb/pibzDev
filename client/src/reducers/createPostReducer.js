import {
  POST_IMG_SUCCESS,
  POST_IMG_FAILURE,
  CREATE_POST_SUCCESS,
  CREATE_POST_FAILURE,
} from "./../actions/types";

const initialState = {
  imageName: null,
  uploaded: false,
  post: null,
  errors: null,
};

const createPostReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case POST_IMG_SUCCESS:
      return {
        ...state,
        imageName: payload,
        uploaded: true,
      };
    case POST_IMG_FAILURE:
      return {
        ...state,
        imageName: null,
        uploaded: false,
        errors: payload,
      };
    case CREATE_POST_SUCCESS:
      return {
        ...state,
        post: payload,
      };
    case CREATE_POST_FAILURE:
      return {
        ...state,
        errors: payload,
      };
    default:
      return state;
  }
};

export default createPostReducer;
