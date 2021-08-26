import React, { useState, useCallback } from 'react';
import { Grid } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import * as Yup from 'yup';
import { Alert } from '@material-ui/lab';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import Collapse from '@material-ui/core/Collapse';
import Cookies from 'universal-cookie';

import CustomTextField from '../shared/customTextField/CustomTextField';

import '../../index.css';

const initialValues = { email: '', firstName: '', lastName: '' };

const isEmptyObject = (object) => !Object.keys(object).length;

const getObjectsDiff = (object1, object2) => {
  const result = {};

  Object.entries(object1).forEach(([key, value]) => {
    if (typeof value === 'object' && typeof object2[key] === 'object') {
      const objectsDiff = getObjectsDiff(value, object2[key]);

      if (!isEmptyObject(objectsDiff)) {
        result[key] = getObjectsDiff(value, object2[key]);
      }
    } else if (value !== object2[key]) {
      result[key] = object2[key];
    }
  });

  return result;
};

export const EditProfile = ({ open, onClose, setUser, userId }) => {
  const [successPatch, setSuccessPatch] = useState(null);
  const [openAlert, setOpenAlert] = useState(false);
  const { t } = useTranslation();
  const nameRegex = new RegExp(/[a-zA-Z]/);

  const closeAlert = useCallback(() => {
    setOpenAlert(false);
  }, []);

  const formik = useFormik({
    initialValues,
    onSubmit: async (values) => {
      try {
        const patchUserDto = getObjectsDiff(initialValues, values);
        const cookies = new Cookies();
        const token = cookies.get('token');
        const response = await fetch(`/api/user/${userId}?token=${token}`, {
          body: JSON.stringify(patchUserDto),
          headers: { 'Content-type': 'application/json' },
          method: 'PATCH',
        });
        const data = await response.json();

        if (response.ok) {
          setSuccessPatch(data);
          setOpenAlert(true);
          setUser(data);
        } else {
          setSuccessPatch(false);
          setOpenAlert(true);
        }
      } catch (error) {
        console.log(error);
      } finally {
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
            <Button color="primary" type="submit">
              {t('save')}
            </Button>
          </DialogActions>
        </form>
      </Dialog>

      {successPatch ? (
        <Collapse in={openAlert}>
          <Alert variant="filled" onClose={closeAlert} severity="success">
            Данные изменены
          </Alert>
        </Collapse>
      ) : (
        <Collapse in={openAlert}>
          <Alert variant="filled" onClose={closeAlert} severity="error">
            Ошибка
          </Alert>
        </Collapse>
      )}
    </>
  );
};

EditProfile.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  setUser: PropTypes.func.isRequired,
  userId: PropTypes.string.isRequired,
};
