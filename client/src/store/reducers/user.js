import { updateUser } from '../actions/user/actionTypes';

export const user = (state = null, action) => {
  if (action.type === updateUser) {
    return action.payload;
  }

  return state;
};
