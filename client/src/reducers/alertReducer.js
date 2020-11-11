import { ALERT_SEND, ALERT_REMOVE } from './../actions/types';

const initialState = {
  showAlert: false,
  errors: [],
};

const alertReducer = (state = initialState, action) => {
  switch (action.type) {
    case ALERT_SEND:
      return {
        ...state,
        showAlert: true,
        errors: action.payload,
      };
    case ALERT_REMOVE:
      return {
        ...state,
        showAlert: false,
        errors: [],
      };
    default:
      return state;
  }
};

export default alertReducer;
