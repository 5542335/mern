import React, { useCallback, useEffect, useState } from 'react';
import Chip from '@material-ui/core/Chip';
import FavoriteIcon from '@material-ui/icons/Favorite';
import AddBoxIcon from '@material-ui/icons/AddBox';
import { useSelector } from 'react-redux';
import { gql, useQuery } from '@apollo/client';
import { Alert } from '@material-ui/lab';

import { SimpleBackdrop } from '../shared/loading/BackDrop';
import { ModalContent } from './header/modal/ModalContent';
import { Modal } from './header/modal/Modal';
import { CardComponent } from './content/CardComponent';
import './collections.css';
import { AddBtn } from './content/AddBtn';

const LIKED_REPOS = gql`
  query MyQuery($likedRepoIds: [ID!]!) {
    nodes(ids: $likedRepoIds) {
      ... on Repository {
        id
        name
        owner {
          login
        }
        openGraphImageUrl
      }
    }
  }
`;

export const Collections = () => {
  const [open, setOpen] = useState(false);
  const [disableBtn, setDisableBtn] = useState(true);
  const [collections, setCollections] = useState();
  const tokenStore = useSelector((state) => state.token);
  const [likedRepoIds, setLikedRepoIds] = useState();
  const { data, loading } = useQuery(LIKED_REPOS, { variables: { likedRepoIds } });
  const [alert, setAlert] = useState(false);
  const [selectedCollection, setSelectedCollection] = useState('');
  const [selectedLikedRepo, setSelectedLikedRepo] = useState(true);

  console.log(likedRepoIds);

  const { _id: id } = useSelector((state) => state.user) || {};

  useEffect(() => {
    const getCollections = async () => {
      const collectionRow = await fetch(`api/collections/getCollections?token=${tokenStore}`);
      const collectionRowToJSON = await collectionRow.json();

      setCollections(collectionRowToJSON);
    };

    getCollections();
  }, [data]);

  useEffect(() => {
    const getLikedRepoIds = async () => {
      const collectionRow = await fetch(`api/user/getLikedRepoIds?token=${tokenStore}`);
      const collectionRowToJSON = await collectionRow.json();

      setLikedRepoIds(collectionRowToJSON);
    };

    getLikedRepoIds();
  }, []);

  const handleOpenModal = useCallback(() => {
    setOpen(true);
  }, []);

  const handleDeleteCollection = (collectionName) => async () => {
    const response = await fetch('/api/collections/delete', {
      body: JSON.stringify({ collectionName, userId: id }),
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      method: 'DELETE',
    });
    const responseToJSON = await response.json();

    const newCollections = { ...collections };

    delete newCollections[responseToJSON.collectionName];

    setCollections(newCollections);
  };

  const handleClickCollection = (collectionName) => () => {
    setLikedRepoIds(collections[collectionName]);
    setSelectedCollection(collectionName);
    setSelectedLikedRepo(false);
  };

  const handleClickLikedRepo = useCallback(() => {
    const getLikedRepoIds = async () => {
      const collectionRow = await fetch(`api/user/getLikedRepoIds?token=${tokenStore}`);
      const collectionRowToJSON = await collectionRow.json();

      setLikedRepoIds(collectionRowToJSON);
    };

    getLikedRepoIds();
    setSelectedCollection('');
    setSelectedLikedRepo(true);
  }, []);
  const closeAlert = useCallback(() => {
    setAlert(false);
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
          {collections &&
            Object.keys(collections).map((item) => (
              <Chip
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
          <Modal open={open} setOpen={setOpen}>
            <ModalContent
              setOpen={setOpen}
              disableBtn={disableBtn}
              setDisableBtn={setDisableBtn}
              collections={collections}
              setCollections={setCollections}
              setAlert={setAlert}
            />
          </Modal>
        </div>

        <div className="contentContainer">
          {data?.nodes.length ? (
            <CardComponent
              data={data}
              setLikedRepoIds={setLikedRepoIds}
              selectedLikedRepo={selectedLikedRepo}
              likedRepoIds={likedRepoIds}
              selectedCollection={selectedCollection}
            />
          ) : (
            <AddBtn />
          )}
        </div>
      </div>
      {alert ? (
        <Alert
          variant="filled"
          severity="error"
          onClose={closeAlert}
          style={{ bottom: 0, position: 'fixed', width: '97vw' }}
        >
          Коллекция с таким названием уже создана
        </Alert>
      ) : null}
    </>
  );
};
