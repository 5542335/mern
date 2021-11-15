import { useReducer } from 'react';

export const openEditProfile = 'openEditProfile';
export const openEditPass = 'openEditPass';
export const openEditAvatar = 'openEditAvatar';
export const closeModal = 'closeModal';

const initialState = {
  isEditingAvatar: false,
  isEditingPass: false,
  isEditingProfile: false,
};

function reducer(state, action) {
  switch (action.type) {
    case openEditProfile:
      return { ...state, isEditingProfile: true };
    case openEditPass:
      return { ...state, isEditingPass: true };
    case openEditAvatar:
      return { ...state, isEditingAvatar: true };
    case closeModal:
      return { ...initialState };
    default:
      throw new Error(`Unknown action ${action.type}`);
  }
}

export const useProfileData = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleUpdate = (actionType) => () => {
    dispatch({ type: actionType });
  };

  return [state, handleUpdate];
};
