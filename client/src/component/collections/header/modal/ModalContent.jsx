import React, { useCallback } from 'react';
import TextField from '@material-ui/core/TextField';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import { useFormik } from 'formik';

import { alertAction } from '../../../../store/actions/alert/index';
import { createCollectionAction } from '../../../../store/actions/collections';
import { CustomButton } from '../../../shared/buttons/CustomButton';
import styles from './modalContent.module.css';

export const ModalContent = ({ setOpen, disableBtn, setDisableBtn }) => {
  const { allCollections } = useSelector((state) => state.collections);

  const dispatch = useDispatch();

  const commentStroke = useCallback(
    (event) => {
      const currMessage = event.target.value;

      if (currMessage) {
        setDisableBtn(false);
      } else {
        setDisableBtn(true);
      }
    },
    [setDisableBtn],
  );

  const formik = useFormik({
    initialValues: { collectionName: '' },
    onSubmit: async (values, { setValues }) => {
      try {
        setValues({ collectionName: '' });
        setOpen(false);

        if (!Object.keys(allCollections).includes(values.collectionName)) {
          dispatch(createCollectionAction(values));
        } else {
          dispatch(alertAction('Коллекция с таким названием уже создана', true, 'error'));
        }
      } catch (error) {
        dispatch(alertAction(`Что-то пошло не так (${error.message})`, true, 'error'));
      }
    },

    validationSchema: Yup.object({
      collectionName: Yup.string(),
    }),
  });

  const handleCancelBtn = useCallback(() => {
    formik.setValues({ collectionName: '' });
    setOpen(false);
  }, [formik, setOpen]);

  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <div className={styles.modalTitle}>
          <h2>Создание новой коллекции</h2>
        </div>
        <div className={styles.modalInput}>
          <TextField
            id="collectionName"
            name="collectionName"
            label="Введите название..."
            variant="outlined"
            onKeyUp={commentStroke}
            fullWidth
            onChange={formik.handleChange}
            value={formik.values.collectionName}
          />
        </div>
        <div>
          <CustomButton htmlType="submit" disabled={disableBtn}>
            Создать
          </CustomButton>
          <CustomButton type="secondary" onClick={handleCancelBtn}>
            Отмена
          </CustomButton>
        </div>
      </form>
    </>
  );
};

ModalContent.propTypes = {
  disableBtn: PropTypes.bool.isRequired,
  setDisableBtn: PropTypes.func.isRequired,
  setOpen: PropTypes.func.isRequired,
};
