import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import { user } from './user';
import { token } from './token';
import { repositories } from './repositories';
import { admin } from './admin';
import { alert } from './alert';
import { collections } from './collections';
import { loading } from './loading';

export const rootReducer = (history) =>
  combineReducers({ admin, alert, collections, loading, repositories, router: connectRouter(history), token, user });
