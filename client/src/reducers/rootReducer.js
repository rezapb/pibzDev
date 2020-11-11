import { combineReducers } from "redux";

// Reducers
import alertReducer from "./alertReducer";
import authReducer from "./authReducer";
import profileReducer from "./profileReducer";
import postReducer from "./postReducer";
import createPostReducer from "./createPostReducer";

const rootReducer = combineReducers({
  alertReducer,
  authReducer,
  profileReducer,
  postReducer,
  createPostReducer,
});

export default rootReducer;
