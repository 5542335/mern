import React, { useCallback, useEffect, useState } from 'react';
import Chip from '@material-ui/core/Chip';
import FavoriteIcon from '@material-ui/icons/Favorite';
import AddBoxIcon from '@material-ui/icons/AddBox';
import { useDispatch, useSelector } from 'react-redux';
import { useQuery } from '@apollo/client';

import { useSelect } from './hooks/useSelect';
import { getLikedRepoIdsAction } from '../../store/actions/repositories';
import { getCollectionsAction } from '../../store/actions/collections';
import { SimpleBackdrop } from '../shared/loading/BackDrop';
import { ModalContent } from './header/modal/ModalContent';
import { CustomModal } from '../shared/modal/CustomModal';
import { CardComponent } from './content/CardComponent';
import './collections.css';
import { AddBtn } from './content/AddBtn';
// import { updateLikedRepoIds } from '../../store/actions/repositories/actionTypes';
import { updateCollectionRepositories } from '../../store/actions/collections/actionTypes';
import { LIKED_REPOS } from '../../queries/githubQueryForCollections';

export const Collections = () => {
  const [open, setOpen] = useState(false);
  const [disableBtn, setDisableBtn] = useState(true);
  const { likedRepoIds } = useSelector((state) => state.repositories);
  const { allCollections } = useSelector((state) => state.collections);
  const dispatch = useDispatch();
  const { data, loading } = useQuery(LIKED_REPOS, {
    notifyOnNetworkStatusChange: true,
    onCompleted: (collectionRepositories) => {
      dispatch({ payload: collectionRepositories, type: updateCollectionRepositories });
    },
    variables: { likedRepoIds },
  });

  const [selectedCollection, selectedLikedRepo, handleClickCollection, handleClickLikedRepo, handleDeleteCollection] =
    useSelect(allCollections);

  useEffect(() => {
    dispatch(getCollectionsAction);
  }, [data, dispatch]);

  useEffect(() => {
    dispatch(getLikedRepoIdsAction);
  }, [dispatch]);

  const handleOpenModal = useCallback(() => {
    setOpen(true);
  }, []);

  return (
    <>
      <div className="collectionsContainer">
        {loading && <SimpleBackdrop />}
        <div className="headerContainer">
          <Chip
            icon={<FavoriteIcon />}
            className={`chip ${selectedLikedRepo ? 'selected' : ''}`}
            label="Все понравившиеся"
            onClick={handleClickLikedRepo}
            clickable={false}
          />
          {allCollections &&
            Object.keys(allCollections).map((item) => (
              <Chip
                key={item}
                className={`chip  ${selectedCollection === item ? 'selected' : ''}`}
                label={item}
                onClick={handleClickCollection(item)}
                onDelete={handleDeleteCollection(item)}
                clickable={false}
              />
            ))}
          <button type="button" id="addBtn" onClick={handleOpenModal} title="Добавить коллекцию">
            <AddBoxIcon id="addIcon" />
          </button>
          <CustomModal open={open}>
            <ModalContent setOpen={setOpen} disableBtn={disableBtn} setDisableBtn={setDisableBtn} />
          </CustomModal>
        </div>

        <div className="contentContainer">
          {data?.nodes.length ? (
            <CardComponent selectedLikedRepo={selectedLikedRepo} selectedCollection={selectedCollection} />
          ) : (
            <AddBtn />
          )}
        </div>
      </div>
    </>
  );
};
