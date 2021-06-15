import React, { useCallback } from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Cookies from 'universal-cookie';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';

export const UserMenu = ({ menuId, anchorEl, setAnchorEl }) => {
  const cookies = new Cookies();
  const history = useHistory();

  const handleMenuClose = useCallback(() => {
    setAnchorEl(null);
  }, []);

  const handleProfileClick = useCallback(() => {
    history.push('/profile');
    setAnchorEl(null);
  }, []);

  const handleLogOut = useCallback(() => {
    setAnchorEl(null);
    cookies.remove('token');
    history.push('/');
  }, []);

  return (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
      id={menuId}
      keepMounted
      transformOrigin={{ horizontal: 'right', vertical: 'top' }}
      open={!!anchorEl}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleProfileClick}>Личный кабинет</MenuItem>
      <MenuItem onClick={handleLogOut}>Выйти</MenuItem>
    </Menu>
  );
};

UserMenu.propTypes = {
  anchorEl: PropTypes.node.isRequired,
  menuId: PropTypes.string.isRequired,
  setAnchorEl: PropTypes.func.isRequired,
};
