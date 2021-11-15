import React, { useCallback } from 'react';
import Alert from '@material-ui/lab/Alert';
import Collapse from '@material-ui/core/Collapse';
import { useDispatch, useSelector } from 'react-redux';

import { alertAction } from '../../../store/actions/alert';
import styles from './customAlert.module.css';

export const CustomAlert = () => {
  const dispatch = useDispatch();
  const { alertMessage, openAlert, severity } = useSelector((state) => state.alert);

  const autoCloseAlert = useCallback(() => {
    setTimeout(() => {
      dispatch(alertAction('', false, 'error'));
    }, 5000);
  }, [dispatch]);

  const closeAlert = useCallback(() => {
    dispatch(alertAction('', false, 'error'));
  }, [dispatch]);

  return (
    <div className={styles.alertContainer}>
      <Collapse in={openAlert}>
        <Alert variant="filled" severity={severity} onClose={closeAlert}>
          {alertMessage}
          {openAlert && autoCloseAlert()}
        </Alert>
      </Collapse>
    </div>
  );
};
