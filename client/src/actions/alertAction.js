import { ALERT_SEND, ALERT_REMOVE } from './types';

const alertSend = (errors) => {
  return {
    type: ALERT_SEND,
    payload: errors,
  };
};

const alertRemove = () => {
  return {
    type: ALERT_REMOVE,
  };
};

export const alert = (errors) => {
  return async (dispatch) => {
    if (errors) {
      dispatch(alertSend(errors));
      setTimeout(() => dispatch(alertRemove()), 5000);
    } else {
      dispatch(alertRemove());
    }
  };
};
