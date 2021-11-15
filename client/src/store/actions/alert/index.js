import { showAlert } from './actionTypes';

export const alertAction = (message, isOpen, severity) => ({
  payload: { alertMessage: message, openAlert: isOpen, severity },
  type: showAlert,
});
