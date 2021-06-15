import React, { useCallback } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import { useHistory, useLocation } from 'react-router-dom';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Button from '@material-ui/core/Button';
import { useTranslation } from 'react-i18next';
import { fade, makeStyles } from '@material-ui/core/styles';
import Cookies from 'universal-cookie';

import { routeNames } from '../../../constants/routes';
import { UserMenu } from './userMenu';
import SwitchLanguage from './switchLangButton';

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),

    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
  inputRoot: {
    color: 'inherit',
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  search: {
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    backgroundColor: fade(theme.palette.common.white, 0.15),
    borderRadius: theme.shape.borderRadius,
    marginLeft: 0,
    marginRight: theme.spacing(2),
    position: 'relative',
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  searchIcon: {
    alignItems: 'center',
    display: 'flex',
    height: '100%',
    justifyContent: 'center',
    padding: theme.spacing(0, 2),
    pointerEvents: 'none',
    position: 'absolute',
  },
  sectionDesktopIsLogin: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionDesktopNoLogin: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
}));

export const Header = () => {
  const classes = useStyles();
  const cookies = new Cookies();
  const token = cookies.get('token');
  const [anchorEl, setAnchorEl] = React.useState(null);
  const history = useHistory();

  const menuId = 'primary-search-account-menu';

  const location = useLocation();

  const handleProfileMenuOpen = useCallback((event) => {
    setAnchorEl(event.currentTarget);
  }, []);

  const handleRedirectToRegister = useCallback(() => {
    history.push('/register');
  }, []);

  const loginButton = (
    <div className={classes.sectionDesktopNoLogin}>
      <SwitchLanguage />
      <Button color="inherit" onClick={handleRedirectToRegister}>
        Login
      </Button>
    </div>
  );

  const logOutButton = (
    <div className={classes.sectionDesktopIsLogin}>
      <SwitchLanguage />
      <IconButton
        edge="end"
        aria-label="account of current user"
        aria-controls={menuId}
        aria-haspopup="true"
        onClick={handleProfileMenuOpen}
        color="inherit"
      >
        <AccountCircle />
      </IconButton>
    </div>
  );

  const { t } = useTranslation();

  return (
    <div className={classes.grow}>
      <AppBar position="static" className={classes.appBar}>
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="open drawer">
            <MenuIcon />
          </IconButton>
          <Typography className={classes.title} variant="h6" noWrap>
            {routeNames[location.pathname]}
          </Typography>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder={t('search')}
              classes={{
                input: classes.inputInput,
                root: classes.inputRoot,
              }}
              inputProps={{ 'aria-label': 'search' }}
            />
          </div>
          <div className={classes.grow} />
          {token ? logOutButton : loginButton}
        </Toolbar>
      </AppBar>

      <UserMenu menuId={menuId} anchorEl={anchorEl} setAnchorEl={setAnchorEl} />
    </div>
  );
};
