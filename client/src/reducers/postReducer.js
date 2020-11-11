import {
  GET_POSTS_SUCCESS,
  GET_POSTS_FAILURE,
  CLEAR_POSTS,
  GET_POST_SUCCESS,
  GET_POST_FAILURE,
  CLEAR_LAST_POST,
  POST_COMMENT_SUCCESS,
  POST_COMMENT_FAILURE,
  GET_USER_POSTS_SUCCESS,
  GET_USER_POSTS_FAILURE,
  DELETE_POST_SUCCESS,
  DELETE_POST_FAILURE,
  GET_POSTS_COUNT_SUCCESS,
  GET_POSTS_COUNT_FAILURE,
  CLEAR_POSTS_COUNT,
  SEARCH_POSTS_SUCCESS,
  SEARCH_POSTS_FAILURE,
  CLEAR_SEARCH_POSTS,
} from "./../actions/types";

const initialState = {
  posts: [],
  userPosts: [],
  post: null,
  searchedPosts: [],
  postsCount: 0,
  loading: true,
  errors: null,
};

const postReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_POSTS_SUCCESS:
      return {
        ...state,
        posts: payload,
        loading: false,
      };
    case GET_POSTS_FAILURE:
      return {
        ...state,
        errors: payload,
        loading: true,
      };
    case CLEAR_POSTS:
      return {
        ...state,
        posts: [],
      };
    case GET_POST_SUCCESS:
      return {
        ...state,
        post: payload,
        loading: false,
      };
    case GET_POST_FAILURE:
      return {
        ...state,
        errors: payload,
        loading: true,
      };
    case CLEAR_LAST_POST:
      return {
        ...state,
        post: null,
        userPosts: [],
      };
    case POST_COMMENT_SUCCESS:
      return {
        ...state,
        post: { ...state.post, comments: payload },
      };
    case POST_COMMENT_FAILURE:
      return {
        ...state,
        post: { ...state.post, errors: payload },
      };
    case GET_USER_POSTS_SUCCESS:
      return {
        ...state,
        userPosts: payload,
      };
    case GET_USER_POSTS_FAILURE:
      return {
        ...state,
        errors: payload,
      };
    case DELETE_POST_SUCCESS:
      return {
        ...state,
        userPosts: state.userPosts.filter((post) => post._id !== payload),
      };
    case DELETE_POST_FAILURE:
      return {
        ...state,
        errors: payload,
      };
    case GET_POSTS_COUNT_SUCCESS:
      return {
        ...state,
        postsCount: payload,
      };
    case GET_POSTS_COUNT_FAILURE:
      return {
        ...state,
        errors: payload,
      };
    case CLEAR_POSTS_COUNT:
      return {
        ...state,
        postsCount: 0,
      };
    case SEARCH_POSTS_SUCCESS:
      return {
        ...state,
        searchedPosts: payload,
      };
    case SEARCH_POSTS_FAILURE:
      return {
        ...state,
        errors: payload,
      };
    case CLEAR_SEARCH_POSTS:
      return {
        ...state,
        searchedPosts: [],
      };
    default:
      return state;
  }
};

export default postReducer;
