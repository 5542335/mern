import React, { useCallback } from 'react';
import { push } from 'connected-react-router';
import { useDispatch } from 'react-redux';

import styles from './addBtn.module.css';

export const AddBtn = () => {
  const dispatch = useDispatch();
  const handleRedirectToHome = useCallback(() => {
    dispatch(push('/'));
  }, [dispatch]);

  return (
    <>
      <div className={styles.btnContainer}>
        <div className={styles.txtUnderBtn}>Здесь пока ничего нет :(</div>
        <div>
          <button type="button" className={styles.addButton} onClick={handleRedirectToHome}>
            Добавить
          </button>
        </div>
      </div>
    </>
  );
};
