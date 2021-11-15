import { showAlert } from '../actions/alert/actionTypes';

export default (store) =>
  (next) =>
  async (action, options = {}) => {
    const { alertOptions } = options;

    if (alertOptions) {
      try {
        const response = await next(action, options);

        if (alertOptions.successMessage) {
          store.dispatch({
            payload: { alertMessage: alertOptions.successMessage, openAlert: true, severity: 'success' },
            type: showAlert,
          });
        }

        return response;
      } catch (error) {
        store.dispatch({
          payload: { alertMessage: error.message, openAlert: true, severity: 'error' },
          type: showAlert,
        });

        return error;
      }
    } else {
      return next(action, options);
    }
  };
