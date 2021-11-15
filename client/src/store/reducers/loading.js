import { hideLoader, showLoader } from '../actions/loading/actionTypes';

const defaultState = {
  isLoading: false,
};

export const loading = (state = defaultState, action) => {
  switch (action.type) {
    case showLoader:
      return { ...state, isLoading: true };

    case hideLoader:
      return { ...state, isLoading: false };

    default:
      return state;
  }
};
