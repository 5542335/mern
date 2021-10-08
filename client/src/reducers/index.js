import { combineReducers } from 'redux';

import { user } from './user';
import { token } from './token';

export const rootReducer = () => combineReducers({ token, user });
