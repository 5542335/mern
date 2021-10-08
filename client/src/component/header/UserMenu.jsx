import React, { useCallback } from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import Cookies from 'universal-cookie';
import { useDispatch, useSelector } from 'react-redux';

export const UserMenu = ({ menuId, anchorEl, setAnchorEl }) => {
  const history = useHistory();
  const { t } = useTranslation();
  const userStore = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const cookies = new Cookies();

  const handleMenuClose = useCallback(() => {
    setAnchorEl(null);
  }, []);

  const handleProfileClick = useCallback(() => {
    history.push('/profile');
    setAnchorEl(null);
  }, []);

  const handleAdmin = useCallback(() => {
    history.push('/admin');
    setAnchorEl(null);
  }, []);

  const handleLogOut = useCallback(() => {
    cookies.remove('token');
    setAnchorEl(null);
    dispatch({ payload: null, type: 'token' });
    history.push('/');
  }, []);

  const role = userStore?.role.includes('admin');

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
      {role ? <MenuItem onClick={handleAdmin}>Админ</MenuItem> : null}
    </Menu>
  );
};

UserMenu.propTypes = {
  anchorEl: PropTypes.node.isRequired,
  menuId: PropTypes.string.isRequired,
  setAnchorEl: PropTypes.func.isRequired,
};
