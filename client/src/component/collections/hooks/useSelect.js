import { useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';

import { updateLikedRepoIds } from '../../../store/actions/repositories/actionTypes';
import { getLikedRepoIdsAction } from '../../../store/actions/repositories';
import { deleteCollectionAction } from '../../../store/actions/collections';

export const useSelect = (allCollections) => {
  const [selectedCollection, setSelectedCollection] = useState('');
  const [selectedLikedRepo, setSelectedLikedRepo] = useState(true);
  const dispatch = useDispatch();

  const handleClickCollection = (collectionName) => () => {
    dispatch({ payload: allCollections[collectionName], type: updateLikedRepoIds });
    setSelectedCollection(collectionName);
    setSelectedLikedRepo(false);
  };

  const handleClickLikedRepo = useCallback(() => {
    dispatch(getLikedRepoIdsAction);
    setSelectedCollection('');
    setSelectedLikedRepo(true);
  }, [dispatch]);

  const handleDeleteCollection = (collectionName) => async () => {
    dispatch(deleteCollectionAction(collectionName));
  };

  return [selectedCollection, selectedLikedRepo, handleClickCollection, handleClickLikedRepo, handleDeleteCollection];
};
