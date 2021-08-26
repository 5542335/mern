import React, { useCallback, useState } from 'react';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  backdrop: {
    color: '#fff',
    zIndex: theme.zIndex.drawer + 1,
  },
}));

export const SimpleBackdrop = () => {
  const classes = useStyles();
  const [open, setOpen] = useState(true);
  const handleClose = useCallback(() => {
    setOpen(false);
  }, []);

  return (
    <div>
      <Backdrop className={classes.backdrop} open={open} onClick={handleClose}>
        <CircularProgress color="secondary" />
      </Backdrop>
    </div>
  );
};
