import React, { useCallback } from 'react';
import { MenuItem, Menu } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import { fetchLikeRepoAction } from '../../../store/actions/repositories';

export const MenuComponent = ({ selectedRowId, anchorEl, setOpen, setAnchorEl }) => {
  const dispatch = useDispatch();
  const { likedRepoIds } = useSelector((state) => state.repositories);

  const { token } = useSelector((state) => state);

  const handleAddToFavorite = (id) => () => {
    dispatch(fetchLikeRepoAction(likedRepoIds?.includes(selectedRowId) ? 'dislike' : 'like', id));
    setAnchorEl(null);
  };

  const handleMenuClose = useCallback(() => {
    setAnchorEl(null);
  }, [setAnchorEl]);

  const handleAddToCollection = useCallback(() => {
    setOpen(true);
    setAnchorEl(null);
  }, [setAnchorEl, setOpen]);

  return (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
      transformOrigin={{ horizontal: 'right', vertical: 'top' }}
      open={!!anchorEl}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleAddToFavorite(selectedRowId)}>
        {token && likedRepoIds?.includes(selectedRowId) ? 'Удалить из понравившихся' : 'Добавить в понравившиеся'}
      </MenuItem>
      <MenuItem onClick={handleAddToCollection}>Добавить в коллекцию</MenuItem>
    </Menu>
  );
};

MenuComponent.propTypes = {
  anchorEl: PropTypes.node,
  selectedRowId: PropTypes.string.isRequired,
  setAnchorEl: PropTypes.func.isRequired,
  setOpen: PropTypes.func.isRequired,
};
MenuComponent.defaultProps = {
  anchorEl: null,
};
