import React, { useCallback } from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Cookies from 'universal-cookie';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

export const UserMenu = ({ menuId, anchorEl, setAnchorEl, setToken }) => {
  const cookies = new Cookies();
  const history = useHistory();
  const { t } = useTranslation();
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
    setToken(null);
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
      <MenuItem onClick={handleProfileClick}>{t('profile.profile')}</MenuItem>
      <MenuItem onClick={handleLogOut}>{t('profile.logOut')}</MenuItem>
    </Menu>
  );
};

UserMenu.propTypes = {
  anchorEl: PropTypes.node,
  menuId: PropTypes.string.isRequired,
  setAnchorEl: PropTypes.func.isRequired,
  setToken: PropTypes.func.isRequired,
};

UserMenu.defaultProps = {
  anchorEl: null,
};
