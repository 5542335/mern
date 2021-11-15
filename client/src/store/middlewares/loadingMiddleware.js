import { showLoader, hideLoader } from '../actions/loading/actionTypes';

export default (store) =>
  (next) =>
  async (action, options = {}) => {
    const { shouldUseLoader } = options;

    if (shouldUseLoader) {
      store.dispatch({ type: showLoader });

      const response = await next(action, options);

      store.dispatch({ type: hideLoader });

      return response;
    }

    return next(action, options);
  };
