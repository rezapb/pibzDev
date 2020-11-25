import axios from "axios";
import {
  GET_POSTS_SUCCESS,
  GET_POSTS_FAILURE,
  CLEAR_POSTS,
  GET_POST_SUCCESS,
  GET_POST_FAILURE,
  POST_IMG_SUCCESS,
  POST_IMG_FAILURE,
  CREATE_POST_SUCCESS,
  CREATE_POST_FAILURE,
  CLEAR_LAST_POST,
  CLEAR_LAST_CREATE_POST_DATA,
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
} from "./types";

// Get all posts
const getPostsSuccess = (data) => {
  return {
    type: GET_POSTS_SUCCESS,
    payload: data,
  };
};

const getPostsFailure = (errors) => {
  return {
    type: GET_POSTS_FAILURE,
    payload: errors,
  };
};

export const getAllPosts = (page) => {
  return async (dispatch) => {
    try {
      const res = await axios.get(`/posts/${page}`);
      dispatch(getPostsSuccess(res.data));
    } catch (error) {
      const errors = error.response;
      dispatch(getPostsFailure(errors));
    }
  };
};

// Clear all posts
const clearAllPosts = () => {
  return {
    type: CLEAR_POSTS,
  };
};

export const clearPosts = () => {
  return async (dispatch) => {
    dispatch(clearAllPosts());
  };
};

// Get post by Id
const getPostSuccess = (data) => {
  return {
    type: GET_POST_SUCCESS,
    payload: data,
  };
};

const getPostFailure = (errors) => {
  return {
    type: GET_POST_FAILURE,
    payload: errors,
  };
};

export const getPostById = (id) => {
  return async (dispatch) => {
    try {
      const res = await axios.get(`/posts/post/${id}`);
      dispatch(getPostSuccess(res.data));
    } catch (error) {
      const errors = error.response;
      dispatch(getPostFailure(errors));
    }
  };
};

// Get posts made by user Id
const getUserPostsSuccess = (data) => {
  return {
    type: GET_USER_POSTS_SUCCESS,
    payload: data,
  };
};

const getUserPostsFailure = (errors) => {
  return {
    type: GET_USER_POSTS_FAILURE,
    payload: errors,
  };
};

export const getPostsByUserId = (id, page) => {
  return async (dispatch) => {
    try {
      const res = await axios.get(`/posts/user/${id}/${page}`);

      dispatch(getUserPostsSuccess(res.data));
    } catch (error) {
      const errors = error.response;
      dispatch(getUserPostsFailure(errors));
    }
  };
};

// Clear last post data
const clearPost = () => {
  return {
    type: CLEAR_LAST_POST,
  };
};

export const clearLastPost = () => {
  return async (dispatch) => {
    dispatch(clearPost());
  };
};

// Clear last create post data
const clearCreatePostData = () => {
  return {
    type: CLEAR_LAST_CREATE_POST_DATA,
  };
};

export const clearLastCreatePostData = () => {
  return async (dispatch) => {
    dispatch(clearCreatePostData());
  };
};

// Post Image
const postImgSuccess = (data) => {
  return {
    type: POST_IMG_SUCCESS,
    payload: data,
  };
};

const postImgFailure = (errors) => {
  return {
    type: POST_IMG_FAILURE,
    payload: errors,
  };
};

export const postImage = (imgData, imgInfo) => {
  return async (dispatch) => {
    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };

      // Send the data as FormData
      let formData = new FormData();
      formData.append("file", imgData.file);
      formData.append("imageName", imgInfo.imageName);
      formData.append("imageDescription", imgInfo.imageDescription);

      const res = await axios.post("/images/upload", formData, config);
      dispatch(postImgSuccess(res.data.image));
    } catch (error) {
      console.log(error);
      const errors = error.response;
      dispatch(postImgFailure(errors));
    }
  };
};

// Create Post
const createPostSuccess = (data) => {
  return {
    type: CREATE_POST_SUCCESS,
    payload: data,
  };
};

const createPostFailure = (errors) => {
  return {
    type: CREATE_POST_FAILURE,
    payload: errors,
  };
};

export const createPost = (postData, history) => {
  return async (dispatch) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const res = await axios.post("/posts/", postData, config);
      dispatch(createPostSuccess(res.data));

      // Redirect after creating post
      history.push("/dashboard");
    } catch (error) {
      console.log(error);
      const errors = error.response;
      dispatch(createPostFailure(errors));
    }
  };
};

// Comment on post
const postCommentSucces = (data) => {
  return {
    type: POST_COMMENT_SUCCESS,
    payload: data,
  };
};

const postCommentFailure = (errors) => {
  return {
    type: POST_COMMENT_FAILURE,
    payload: errors,
  };
};

export const postComment = (id, content) => {
  return async (dispatch) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const res = await axios.post(`/posts/comment/${id}`, content, config);
      dispatch(postCommentSucces(res.data));
    } catch (error) {
      console.log(error);
      const errors = error.response;
      dispatch(postCommentFailure(errors));
    }
  };
};

export const postReply = (id, content) => {
  return async (dispatch) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const res = await axios.post(
        `/posts/comments/reply/${id}`,
        content,
        config
      );
      dispatch(postCommentSucces(res.data));
    } catch (error) {
      console.log(error);
      const errors = error.response;
      dispatch(postCommentFailure(errors));
    }
  };
};

// Delete post by ID
const deletePostSuccess = (data) => {
  return {
    type: DELETE_POST_SUCCESS,
    payload: data,
  };
};

const deletePostFailure = (errors) => {
  return {
    type: DELETE_POST_FAILURE,
    payload: errors,
  };
};

export const deletePost = (id, imageName) => {
  return async (dispatch) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const img = await axios.post(`/images/delete/${imageName}`, config);
      const res = await axios.delete(`/posts/${id}`);
      dispatch(deletePostSuccess(id));
    } catch (error) {
      console.log(error);
      const errors = error.response;
      dispatch(deletePostFailure(errors));
    }
  };
};

// Get all posts count
const getPostsCountSuccess = (data) => {
  return {
    type: GET_POSTS_COUNT_SUCCESS,
    payload: data,
  };
};

const getPostsCountFailure = (errors) => {
  return {
    type: GET_POSTS_COUNT_FAILURE,
    payload: errors,
  };
};

export const getPostsCount = () => {
  return async (dispatch) => {
    try {
      const res = await axios.get("/posts/count/all");
      dispatch(getPostsCountSuccess(res.data));
    } catch (error) {
      console.log(error);
      const errors = error.response;
      dispatch(getPostsCountFailure(errors));
    }
  };
};

// Get user posts count
export const getUserPostsCount = (id) => {
  return async (dispatch) => {
    try {
      const res = await axios.get(`/posts/count/${id}`);
      dispatch(getPostsCountSuccess(res.data));
    } catch (error) {
      console.log(error);
      const errors = error.response;
      dispatch(getPostsCountFailure(errors));
    }
  };
};

// Clear posts count
const clearCount = () => {
  return {
    type: CLEAR_POSTS_COUNT,
  };
};

export const clearPostsCount = () => {
  return async (dispatch) => {
    dispatch(clearCount());
  };
};

// Get posts with a tag
const getPostsWithTagSuccess = (data) => {
  return {
    type: GET_POSTS_SUCCESS,
    payload: data,
  };
};

const getPostsWithTagFailure = (errors) => {
  return {
    type: GET_POSTS_SUCCESS,
    payload: errors,
  };
};

export const getPostsWithTag = (tag, page) => {
  return async (dispatch) => {
    try {
      const res = await axios.get(`/posts/tags/${tag}/${page}`);
      dispatch(getPostsWithTagSuccess(res.data));
    } catch (error) {
      console.log(error);
      const errors = error.response;
      dispatch(getPostsWithTagFailure(errors));
    }
  };
};

// Get posts with a tag count
const getPostsWithTagCountSuccess = (data) => {
  return {
    type: GET_POSTS_COUNT_SUCCESS,
    payload: data,
  };
};

const getPostsWithTagCountFailure = (errors) => {
  return {
    type: GET_POSTS_COUNT_FAILURE,
    payload: errors,
  };
};

export const getPostsWithTagCount = (tag) => {
  return async (dispatch) => {
    try {
      const res = await axios.get(`/posts/tag/count/${tag}`);
      dispatch(getPostsWithTagCountSuccess(res.data));
    } catch (error) {
      console.log(error);
      const errors = error.response;
      dispatch(getPostsWithTagCountFailure(errors));
    }
  };
};

// Search posts
const searchPostsSuccess = (data) => {
  return {
    type: SEARCH_POSTS_SUCCESS,
    payload: data,
  };
};

const searchPostsFailure = (errors) => {
  return {
    type: SEARCH_POSTS_FAILURE,
    payload: errors,
  };
};

export const searchPosts = (text) => {
  return async (dispatch) => {
    try {
      const res = await axios.get(`/posts/search/${text}`);
      dispatch(searchPostsSuccess(res.data));
    } catch (error) {
      console.log(error);
      const errors = error.response;
      dispatch(searchPostsFailure(errors));
    }
  };
};

// Clear search posts
const clearSearch = () => {
  return {
    type: CLEAR_SEARCH_POSTS,
  };
};

export const clearSearchPosts = () => {
  return async (dispatch) => {
    dispatch(clearSearch());
  };
};
