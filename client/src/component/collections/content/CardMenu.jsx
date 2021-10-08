import React, { useCallback } from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import PropTypes from 'prop-types';

export const CardMenu = ({ anchorEl, setAnchorEl, handleDeleteCard, handleMoreDetails, selectedCardId }) => {
  const handleMenuClose = useCallback(() => {
    setAnchorEl(null);
  }, []);

  return (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
      transformOrigin={{ horizontal: 'right', vertical: 'top' }}
      open={!!anchorEl}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMoreDetails(selectedCardId)}>Подробнее</MenuItem>
      <MenuItem onClick={handleDeleteCard(selectedCardId)}>Удалить</MenuItem>
    </Menu>
  );
};

CardMenu.propTypes = {
  anchorEl: PropTypes.node.isRequired,
  handleDeleteCard: PropTypes.func.isRequired,
  handleMoreDetails: PropTypes.func.isRequired,
  selectedCardId: PropTypes.string.isRequired,
  setAnchorEl: PropTypes.func.isRequired,
};
