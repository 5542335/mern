import {
  updateAllRepositories,
  updateCurrentRepository,
  updateLikedRepoIds,
} from '../actions/repositories/actionTypes';

const defaultState = {
  allRepositories: [],
  currentRepository: {},
  likedRepoIds: [],
};

export const repositories = (state = defaultState, action) => {
  switch (action.type) {
    case updateAllRepositories:
      return { ...state, allRepositories: action.payload };

    case updateCurrentRepository:
      return { ...state, currentRepository: action.payload };

    case updateLikedRepoIds:
      return { ...state, likedRepoIds: action.payload };

    default:
      return state;
  }
};
