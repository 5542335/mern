import React, { useCallback, useMemo } from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import Cookies from 'universal-cookie';
import { useDispatch, useSelector } from 'react-redux';
import { push } from 'connected-react-router';

export const UserMenu = ({ menuId, anchorEl, setAnchorEl }) => {
  const { t } = useTranslation();
  const { user } = useSelector((state) => state);
  const dispatch = useDispatch();
  const cookies = useMemo(() => new Cookies(), []);

  const handleMenuClose = useCallback(() => {
    setAnchorEl(null);
  }, [setAnchorEl]);

  const handleProfileClick = useCallback(() => {
    dispatch(push('/profile'));
    setAnchorEl(null);
  }, [setAnchorEl, dispatch]);

  const handleAdmin = useCallback(() => {
    dispatch(push('/admin'));
    setAnchorEl(null);
  }, [dispatch, setAnchorEl]);

  const handleLogOut = useCallback(() => {
    cookies.remove('token');
    setAnchorEl(null);
    dispatch({ payload: null, type: 'token' });
    dispatch(push('/'));
  }, [setAnchorEl, dispatch, cookies]);

  const role = user?.role.includes('admin');

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
  anchorEl: PropTypes.node,
  menuId: PropTypes.string.isRequired,
  setAnchorEl: PropTypes.func.isRequired,
};
UserMenu.defaultProps = {
  anchorEl: null,
};
