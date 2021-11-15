import React, { useCallback, useState } from 'react';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';

import style from './backDrop.module.css';

export const SimpleBackdrop = () => {
  const [open, setOpen] = useState(true);
  const handleClose = useCallback(() => {
    setOpen(false);
  }, []);

  return (
    <Backdrop className={style.backdrop} open={open} onClick={handleClose}>
      <CircularProgress color="secondary" />
    </Backdrop>
  );
};
