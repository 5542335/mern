import React, { useCallback, useState } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import MenuOpenIcon from '@material-ui/icons/MenuOpen';
import { push } from 'connected-react-router';
import { useDispatch } from 'react-redux';

const StyledMenu = (props) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      horizontal: 'center',
      vertical: 'bottom',
    }}
    transformOrigin={{
      horizontal: 'center',
      vertical: 'top',
    }}
    // eslint-disable-next-line react/jsx-props-no-spreading
    {...props}
  />
);

const StyledMenuItem = withStyles((theme) => ({
  root: {
    '&:focus': {
      '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
        color: theme.palette.common.white,
      },
      backgroundColor: theme.palette.warning.main,
    },
  },
}))(MenuItem);

export const MainMenu = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const dispatch = useDispatch();

  const handleClick = useCallback((event) => {
    setAnchorEl(event.target);
  }, []);

  const handleClose = useCallback(() => {
    setAnchorEl(null);
  }, []);

  const handleLikedRepository = useCallback(() => {
    dispatch(push('/collections'));
    setAnchorEl(null);
  }, [dispatch]);

  return (
    <div>
      <MenuOpenIcon
        aria-controls="customized-menu"
        aria-haspopup="true"
        variant="contained"
        color="inherit"
        onClick={handleClick}
        fontSize="large"
      />
      <StyledMenu id="customized-menu" anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleClose}>
        <StyledMenuItem>
          <ListItemIcon>
            <KeyboardArrowRightIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Понравившиеся репозитории" onClick={handleLikedRepository} />
        </StyledMenuItem>
      </StyledMenu>
    </div>
  );
};
