import React from 'react';
import { Grid } from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';

import { CustomButton } from '../shared/buttons/CustomButton';
import CustomTextField from '../shared/customTextField/CustomTextField';
import { updateUserProfileAction } from '../../store/actions/user';
import styles from './profile.module.css';
import { alertAction } from '../../store/actions/alert/index';

const initialValues = { email: '', firstName: '', lastName: '' };

export const EditProfile = ({ open, onClose }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const nameRegex = new RegExp(/[a-zA-Z]/);

  const formik = useFormik({
    initialValues,
    onSubmit: async (values) => {
      try {
        dispatch(updateUserProfileAction(values, initialValues));
      } catch {
        dispatch(alertAction('Что-то пошло не так, данные не изменены', true, 'error'));
      } finally {
        formik.setValues(initialValues);
        onClose();
      }
    },

    validationSchema: Yup.object({
      email: Yup.string().email(t('validation.invalidEmail')),
      firstName: Yup.string().matches(nameRegex, t('validation.nameMatches')).max(32, t('validation.nameMaxLength')),
      lastName: Yup.string().matches(nameRegex, t('validation.nameMatches')).max(32, t('validation.nameMaxLength')),
    }),
  });

  return (
    <>
      <Dialog open={open} onClose={onClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">{t('profile.editProfile')}</DialogTitle>
        <form onSubmit={formik.handleSubmit}>
          <DialogContent>
            <DialogContentText>{t('profile.newData')}</DialogContentText>

            <Grid container spacing={1} className={styles.grid}>
              <CustomTextField
                id="email"
                label={t('register.email')}
                name="email"
                type="email"
                autoComplete="Почта"
                helperText=""
                formik={formik}
                required={false}
              />
              <CustomTextField
                id="firstName"
                label={t('register.firstName')}
                name="firstName"
                type="text"
                autoComplete="Имя"
                helperText=""
                formik={formik}
                required={false}
              />
              <CustomTextField
                id="lastName"
                label={t('register.lastName')}
                name="lastName"
                type="text"
                autoComplete="Фамилия"
                helperText=""
                formik={formik}
                required={false}
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
    </>
  );
};

EditProfile.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
};
