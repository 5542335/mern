import React, { useState } from 'react';
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

import CustomTextField from '../registerForm/body/Body';

import '../../index.css';

const initialValues = { email: '', firstName: '', lastName: '' };

const getObjectsDiff = (object1, object2) => {
  // 1. Получить ключ и значение у первого объекта
  // 2. посмотреть, существует ли такой ключ у второго объекта
  // 3. Если нет - создать это свойство в новом объекте
  // 4. Если да - проверить совпадает ли значение у двух объектов
  // 5. Если не совпадают - выполнить пункт 3.
  const result = [];

  Object.entries(object1).forEach(([key, value]) =>
    Object.entries(object2).forEach(([key, value]) => {
      if (object1[key] === object2[value] && object1[key] === object2[value]) result.push(object2);
    }),
  );
};

export const EditProfile = ({ open, onClose, userId }) => {
  const [successPatch, setSuccessPatch] = useState(null);
  const { t } = useTranslation();
  const nameRegex = new RegExp(/[a-zA-Z]/);

  const formik = useFormik({
    initialValues,
    onSubmit: async (values) => {
      try {
        const patchUserDto = getObjectsDiff(values, initialValues);

        const response = await fetch(`/api/user/${userId}`, {
          body: JSON.stringify(patchUserDto),
          headers: { 'Content-type': 'application/json' },
          method: 'PATCH',
        });
        const data = await response.json();

        if (response.ok) {
          setSuccessPatch(data);
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

      {successPatch && (
        <Alert variant="filled" severity={successPatch ? 'success' : 'error'}>
          {successPatch ? 'Данные изменены' : 'Ошибка'}
        </Alert>
      )}
    </>
  );
};

EditProfile.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  userId: PropTypes.string.isRequired,
};
