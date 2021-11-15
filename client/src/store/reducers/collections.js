import { updateCollectionRepositories, updateCollections } from '../actions/collections/actionTypes';

const defaultState = {
  allCollections: [],
  collectionRepositories: {},
};

export const collections = (state = defaultState, action) => {
  switch (action.type) {
    case updateCollectionRepositories:
      return { ...state, collectionRepositories: action.payload };

    case updateCollections:
      return { ...state, allCollections: action.payload };

    default:
      return state;
  }
};
