import { showAlert } from '../actions/alert/actionTypes';

const defaultState = {
  alertState: { alertMessage: '', openAlert: false, severity: '' },
};

export const alert = (state = defaultState, action) => {
  if (action.type === showAlert) {
    return action.payload;
  }

  return state;
};
