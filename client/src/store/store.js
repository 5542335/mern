import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { routerMiddleware } from 'connected-react-router';

import { rootReducer } from './reducers';
import alertMiddleware from './middlewares/alertMiddleware';
import loadingMiddleware from './middlewares/loadingMiddleware';

export const configureStore = (history) => {
  /* eslint-disable no-underscore-dangle */
  const store = createStore(
    rootReducer(history),
    applyMiddleware(loadingMiddleware, alertMiddleware, thunk, routerMiddleware(history)),
    // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
    /* eslint-enable */
  );

  return store;
};
