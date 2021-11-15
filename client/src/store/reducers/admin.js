import { updateAllUsers, blockUser } from '../actions/admin/actionTypes';

const defaulState = {
  allUsers: [],
};

export const admin = (state = defaulState, action) => {
  if (action.type === updateAllUsers) {
    return { ...state, allUsers: action.payload };
  }

  if (action.type === blockUser) {
    const changedUsers = state.allUsers.map((user) => {
      // eslint-disable-next-line
      if (user._id === action.payload._id) {
        return { ...user, active: action.payload.active };
      }

      return user;
    });

    return { ...state, allUsers: changedUsers };
  }

  return state;
};
