import React, { useState, useCallback } from 'react';
import { Grid } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import * as Yup from 'yup';
import Alert from '@material-ui/lab/Alert';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import Collapse from '@material-ui/core/Collapse';
import { useSelector } from 'react-redux';

import CustomTextField from '../shared/customTextField/CustomTextField';

import './profile.css';

export const EditPass = ({ open, onClose, userId }) => {
  const tokenStore = useSelector((state) => state.token);
  const [successPatch, setSuccessPatch] = useState(null);
  const [isLoading, updateLoadingState] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);
  const { t } = useTranslation();
  const passwordRegex = new RegExp(/^.*(?=.{8,32})(?=.*[!@#$%^&*()-_=+{};:,<.>]{4})((?=.*[A-Z]){1}).*$/);

  const closeAlert = useCallback(() => {
    setOpenAlert(false);
  }, []);

  const formik = useFormik({
    initialValues: { newPassword: '', oldPassword: '' },
    onSubmit: async (values) => {
      try {
        updateLoadingState(true);
        const response = await fetch(`/api/user/${userId}/change-password?token=${tokenStore}`, {
          body: JSON.stringify(values),
          headers: { 'Content-type': 'application/json' },
          method: 'PATCH',
        });
        const data = await response.json();

        setSuccessPatch(data);
        setOpenAlert(true);
      } catch (error) {
        console.log(error);
      } finally {
        updateLoadingState(false);
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

            <Grid container spacing={1} className="grid">
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
            <Button onClick={onClose} color="primary">
              {t('cancel')}
            </Button>
            <Button onClick={onClose} color="primary" type="submit">
              {t('save')}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
      {!successPatch?.message ? (
        <Collapse in={openAlert} className="alert">
          <Alert variant="filled" onClose={closeAlert} severity="success">
            Пароль изменен
          </Alert>
        </Collapse>
      ) : (
        <Collapse in={openAlert} className="alert">
          <Alert variant="filled" onClose={closeAlert} severity="error">
            {successPatch.message}
          </Alert>
        </Collapse>
      )}
      {isLoading && 'Loading...'}
    </>
  );
};

EditPass.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  userId: PropTypes.string.isRequired,
};
