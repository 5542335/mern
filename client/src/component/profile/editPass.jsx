import React, { useState } from 'react';
import { Grid } from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';

import { updateUserPasswordAction } from '../../store/actions/user';
import { alertAction } from '../../store/actions/alert/index';
import { CustomButton } from '../shared/buttons/CustomButton';
import CustomTextField from '../shared/customTextField/CustomTextField';
import styles from './profile.module.css';

export const EditPass = ({ open, onClose }) => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const passwordRegex = new RegExp(/^.*(?=.{8,32})(?=.*[!@#$%^&*()-_=+{};:,<.>]{4})((?=.*[A-Z]){1}).*$/);

  const initialValues = { newPassword: '', oldPassword: '' };

  const formik = useFormik({
    initialValues,
    onSubmit: async (values) => {
      try {
        setIsLoading(true);
        dispatch(updateUserPasswordAction(values));
      } catch {
        dispatch(alertAction('Что-то пошло не так, пароль не изменен', true, 'error'));
      } finally {
        formik.setValues(initialValues);
        setIsLoading(false);
      }
    },
    validationSchema: Yup.object({
      newPassword: Yup.string()
        .matches(passwordRegex, t('validation.passwordMatches'))
        .required(t('validation.required')),
      oldPassword: Yup.string()
        .matches(passwordRegex, t('validation.passwordMatches'))
        .required(t('validation.required')),
    }),
  });

  return (
    <>
      <Dialog open={open} onClose={onClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Изменение пароля</DialogTitle>
        <form onSubmit={formik.handleSubmit}>
          <DialogContent>
            <DialogContentText>{t('profile.newData')}</DialogContentText>

            <Grid container spacing={1} className={styles.grid}>
              <CustomTextField
                id="oldPassword"
                label={t('register.password')}
                name="oldPassword"
                type="password"
                autoComplete="Пароль"
                helperText=""
                formik={formik}
              />
              <CustomTextField
                id="newPassword"
                label={t('register.newPassword')}
                name="newPassword"
                type="password"
                autoComplete="newПароль"
                helperText=""
                formik={formik}
              />
            </Grid>
          </DialogContent>
          <DialogActions>
            <CustomButton type="secondary" onClick={onClose}>
              Отмена
            </CustomButton>
            <CustomButton onClick={onClose} htmlType="submit">
              Сохранить
            </CustomButton>
          </DialogActions>
        </form>
      </Dialog>
      {isLoading && 'Loading...'}
    </>
  );
};

EditPass.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
};
