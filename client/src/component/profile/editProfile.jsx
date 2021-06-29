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

// const getObjectsDiff = (initialValues, values) => {

// }

export const EditProfile = ({ open, onClose, userId }) => {
  const { t } = useTranslation();
  const nameRegex = new RegExp(/[a-zA-Z]/);

  const formik = useFormik({
    initialValues: { email: '', firstName: '', lastName: '' },
    onSubmit: async (values) => {
      try {
        // const patchUserDto = getObjectsDiff(initialValues, values);
        const response = await fetch(`/api/user/${userId}`, {
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

            <Grid container spacing={1} className="grid">
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

EditProfile.propTypes = {
  //   email: PropTypes.string.isRequired,
  //   firstName: PropTypes.string.isRequired,
  //   lastName: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  userId: PropTypes.string.isRequired,
};
