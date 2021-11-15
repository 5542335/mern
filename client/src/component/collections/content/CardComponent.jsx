import React, { useCallback, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import { teal } from '@material-ui/core/colors';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import PropTypes from 'prop-types';
import './cardComponent.css';
import { useSelector, useDispatch } from 'react-redux';
import { push } from 'connected-react-router';

import { deleteRepoFromCollectionAction } from '../../../store/actions/repositories';
import { CardMenu } from './CardMenu';

const useStyles = makeStyles((theme) => ({
  avatar: {
    backgroundColor: teal[500],
  },
  cardContainer: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  expand: {
    marginLeft: 'auto',
    transform: 'rotate(0deg)',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  root: {
    margin: '3px',
    maxWidth: 380,
  },
}));

export const CardComponent = ({ selectedLikedRepo, selectedCollection }) => {
  const { token } = useSelector((state) => state);
  const { collectionRepositories } = useSelector((state) => state.collections);

  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedCardId, setSelectedCardId] = useState('');
  const dispatch = useDispatch();

  const handleDeleteCard = useCallback(
    (id) => async () => {
      if (selectedLikedRepo) {
        dispatch(
          deleteRepoFromCollectionAction(
            `/api/user/dislike?token=${token}`,
            {
              repositoryId: id,
              token,
            },
            id,
          ),
        );
        setAnchorEl(null);
      } else {
        dispatch(
          deleteRepoFromCollectionAction(
            `/api/collections/delete-collect-card`,
            {
              collectionName: selectedCollection,
              repoId: id,
              token,
            },
            id,
          ),
        );
        setAnchorEl(null);
      }
    },
    [dispatch, selectedCollection, selectedLikedRepo, token],
  );

  const handleMoreDetails = useCallback(
    (id) => () => {
      const selectedCard = collectionRepositories?.nodes.find((item) => item.id === id);

      dispatch(push(`/${selectedCard?.owner.login}/${selectedCard?.name}`));
    },
    [dispatch, collectionRepositories],
  );

  const handleMenuOpen = (id) => (event) => {
    setAnchorEl(event.currentTarget);
    setSelectedCardId(id);
  };

  return (
    <>
      <div className={classes.cardContainer}>
        {collectionRepositories?.nodes?.map((item) => (
          <Card className={classes.root} key={item.id}>
            <CardHeader
              avatar={
                <Avatar aria-label="recipe" className={classes.avatar}>
                  <img src={item?.openGraphImageUrl} alt="" id="cardImg" />
                </Avatar>
              }
              action={
                <IconButton aria-label="settings" onClick={handleMenuOpen(item.id)}>
                  <MoreVertIcon />
                </IconButton>
              }
              title={`Название: ${item?.name}`}
              subheader={`Автор: ${item?.owner.login}`}
            />
          </Card>
        ))}
      </div>
      <CardMenu
        anchorEl={anchorEl}
        setAnchorEl={setAnchorEl}
        handleDeleteCard={handleDeleteCard}
        selectedCardId={selectedCardId}
        handleMoreDetails={handleMoreDetails}
      />
    </>
  );
};

CardComponent.propTypes = {
  selectedCollection: PropTypes.string.isRequired,
  selectedLikedRepo: PropTypes.bool.isRequired,
};
