import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import Fab from '@material-ui/core/Fab';

const useStyles1 = makeStyles((theme) => ({
  fab: {
    backgroundColor: 'teal',
  },
  root: {
    flexShrink: 0,
    marginLeft: theme.spacing(2.5),
  },
}));

export const TablePaginationActions = (props) => {
  const classes = useStyles1();
  const { page, onPageChange } = props;

  const handleFirstPageButtonClick = useCallback((event) => {
    onPageChange(event, 0);
  }, []);

  const handleBackButtonClick = useCallback(
    (event) => {
      onPageChange(event, page - 1);
    },
    [page, onPageChange],
  );

  const handleNextButtonClick = useCallback(
    (event) => {
      onPageChange(event, page + 1);
    },
    [page, onPageChange],
  );

  return (
    <div className={classes.root}>
      <IconButton onClick={handleFirstPageButtonClick} disabled={page === 0} aria-label="first page">
        <FirstPageIcon />
      </IconButton>
      <IconButton onClick={handleBackButtonClick} disabled={page === 0} aria-label="previous page">
        <KeyboardArrowLeft />
      </IconButton>
      <Fab size="small" color="default" className={classes.fab}>
        {page + 1}
      </Fab>
      <IconButton onClick={handleNextButtonClick} aria-label="next page">
        <KeyboardArrowRight />
      </IconButton>
    </div>
  );
};

TablePaginationActions.propTypes = {
  onPageChange: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
};
