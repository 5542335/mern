import React from 'react';
import { makeStyles, ThemeProvider, createTheme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { teal } from '@material-ui/core/colors';
import PropTypes from 'prop-types';

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
  },
}));

const theme = createTheme({
  palette: {
    primary: teal,
  },
});

export const SearchInput = ({ label, onChange }) => {
  const classes = useStyles();

  return (
    <ThemeProvider theme={theme}>
      <TextField
        className={classes.margin}
        label={label}
        onChange={onChange}
        variant="outlined"
        id="mui-theme-provider-outlined-input"
      />
    </ThemeProvider>
  );
};

SearchInput.propTypes = {
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};
