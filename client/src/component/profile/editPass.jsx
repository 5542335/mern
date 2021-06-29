import React from 'react';
import { Grid } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import * as Yup from 'yup';
// import { Alert } from '@material-ui/lab';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';

import CustomTextField from '../registerForm/body/Body';

import '../../index.css';

export const EditPass = ({ open, onClose, userId }) => {
  const { t } = useTranslation();
  const passwordRegex = new RegExp(/^.*(?=.{8,32})(?=.*[!@#$%^&*()-_=+{};:,<.>]{4})((?=.*[A-Z]){1}).*$/);

  const formik = useFormik({
    initialValues: { newPassword: '', oldPassword: '' },
    onSubmit: async (values) => {
      try {
        const response = await fetch(`/api/user/${userId}/change-password`, {
          body: JSON.stringify(values),
          headers: { 'Content-type': 'application/json' },
          method: 'PATCH',
        });
        const data = await response.json();

        if (response.ok) {
          console.log(data);
        }
      } catch (error) {
        console.log(error);
      }
    },

    validationSchema: Yup.object({
      newPass: Yup.string().matches(passwordRegex, t('validation.passwordMatches')).required(t('validation.required')),
      oldPass: Yup.string().matches(passwordRegex, t('validation.passwordMatches')).required(t('validation.required')),
    }),
  });

  return (
    <>
      <Dialog open={open} onClose={onClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">{t('profile.editProfile')}</DialogTitle>
        <form onSubmit={formik.handleSubmit}>
          <DialogContent>
            <DialogContentText>{t('profile.newData')}</DialogContentText>

            <Grid container spacing={1} className="grid">
              <CustomTextField
                id="newPass"
                label={t('register.password')}
                name="newPass"
                type="password"
                autoComplete="newПароль"
                helperText=""
                formik={formik}
              />
              <CustomTextField
                id="oldPass"
                label={t('register.password')}
                name="oldPass"
                type="password"
                autoComplete="Пароль"
                helperText=""
                formik={formik}
              />
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={onClose} color="primary">
              {t('cancel')}
            </Button>
            <Button onClick={onClose} color="primary" type="submit">
              {t('save')}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
      {/* {serverError && (
        <Alert variant="filled" severity="error">
          {serverError}
        </Alert>
      )} */}
    </>
  );
};

EditPass.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  userId: PropTypes.string.isRequired,
};
