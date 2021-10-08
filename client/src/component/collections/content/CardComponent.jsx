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
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

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

export const CardComponent = ({ data, likedRepoIds, selectedLikedRepo, selectedCollection, setLikedRepoIds }) => {
  const tokenStore = useSelector((state) => state.token);
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedCardId, setSelectedCardId] = useState('');
  const history = useHistory();

  const handleDeleteCard = useCallback(
    (id) => async () => {
      if (selectedLikedRepo) {
        const response = await fetch(`/api/user/dislike?token=${tokenStore}`, {
          body: JSON.stringify({ repositoryId: id, token: tokenStore }),
          headers: {
            'Content-Type': 'application/json;charset=utf-8',
          },
          method: 'PATCH',
        });

        if (response.ok) {
          const selectedCard = data.nodes.find((item) => item.id === id);
          const newLikedRepoIds = [...likedRepoIds];
          const index = newLikedRepoIds.indexOf(selectedCard.id);

          newLikedRepoIds.splice(index, 1);
          setLikedRepoIds(newLikedRepoIds);
          setAnchorEl(null);
        }
      } else {
        const response = await fetch(`/api/collections/delete-collect-card`, {
          body: JSON.stringify({ collectionName: selectedCollection, repoId: id, token: tokenStore }),
          headers: {
            'Content-Type': 'application/json;charset=utf-8',
          },
          method: 'PATCH',
        });

        if (response.ok) {
          const selectedCard = data.nodes.find((item) => item.id === id);
          const newLikedRepoIds = [...likedRepoIds];
          const index = newLikedRepoIds.indexOf(selectedCard.id);

          newLikedRepoIds.splice(index, 1);
          setLikedRepoIds(newLikedRepoIds);
          setAnchorEl(null);
        }
      }
    },
    [anchorEl, likedRepoIds],
  );

  const handleMoreDetails = useCallback(
    (id) => () => {
      const selectedCard = data.nodes.find((item) => item.id === id);

      history.push(`/${selectedCard.owner.login}/${selectedCard.name}`);
    },
    [],
  );

  const handleMenuOpen = (id) => (event) => {
    setAnchorEl(event.currentTarget);
    setSelectedCardId(id);
  };

  return (
    <>
      <div className={classes.cardContainer}>
        {data.nodes.map((item) => (
          <Card className={classes.root}>
            <CardHeader
              avatar={
                <Avatar aria-label="recipe" className={classes.avatar}>
                  <img src={item?.openGraphImageUrl} alt="" id="cardImg" />
                </Avatar>
              }
              action={
                <IconButton aria-label="settings">
                  <MoreVertIcon onClick={handleMenuOpen(item.id)} />
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
  data: PropTypes.string.isRequired,
  likedRepoIds: PropTypes.string.isRequired,
  selectedCollection: PropTypes.string.isRequired,
  selectedLikedRepo: PropTypes.bool.isRequired,
  setLikedRepoIds: PropTypes.func.isRequired,
};
