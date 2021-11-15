import Cookies from 'universal-cookie';

import { updateToken } from '../actions/auth/actionTypes';

const cookies = new Cookies();

export const token = (state = cookies.get('token') || null, action) => {
  if (action.type === updateToken) {
    return action.payload;
  }

  return state;
};
