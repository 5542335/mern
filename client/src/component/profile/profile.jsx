import React, { useEffect, useState, useCallback } from 'react';
import Cookies from 'universal-cookie';
import { Container, Grid } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
// import TextField from '@material-ui/core/TextField';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import * as Yup from 'yup';
import { Alert } from '@material-ui/lab';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';

import CustomTextField from '../registerForm/body/body';

import '../../index.css';

export const Profile = () => {
  const [user, setUser] = useState(null);
  const [open, setOpen] = useState(false);
  const [serverError, setServerError] = useState(null);

  const { t } = useTranslation();
  const nameRegex = new RegExp(/[a-zA-Z]/);
  // const [edit, setEdit] = useState(false);
  // const values = { email: '', firstName: '', lastName: '' };
  const handleClickOpen = useCallback(() => {
    setOpen(true);
  }, []);

  const handleClose = useCallback(() => {
    setOpen(false);
  }, []);

  useEffect(() => {
    const cookies = new Cookies();
    const fetchUser = async () => {
      const token = cookies.get('token');
      const userRaw = await fetch(`api/user?token=${token}`);
      const data = await userRaw.json();

      setUser(data);
    };

    fetchUser();
  }, []);

  // useEffect(() => {
  //   const editUser = async () => {
  //     const requestOptions = {
  //       body: JSON.stringify(values),
  //       headers: { 'Content-Type': 'application/json' },
  //       method: 'PUT',
  //     };
  //     const response = await fetch('api/user', requestOptions);
  //     const data = await response.json();
  //     setEdit(data);
  //   };

  //   editUser();
  // }, []);
  const formik = useFormik({
    initialValues: { email: '', firstName: '', lastName: '' },
    onSubmit: async (values) => {
      try {
        const response = await fetch('/api/profile', {
          body: JSON.stringify(values),
          headers: { 'Content-type': 'application/json' },
          method: 'PUT',
        });
        // const data = await response.json();

        if (response.ok) {
          setServerError(null);
        }
      } catch (error) {
        console.log(error);
      }
    },

    validationSchema: Yup.object({
      email: Yup.string().email('Неверный email адрес').required(t('required')),
      firstName: Yup.string().matches(nameRegex, t('nameMatches')).max(32, t('nameMaxLength')).required(t('required')),
      lastName: Yup.string().matches(nameRegex, t('nameMatches')).max(32, t('nameMaxLength')).required(t('required')),
    }),
  });

  return (
    <>
      <Container maxWidth="xs" className="container">
        <Grid container className="grid">
          <Grid item>
            <Typography component="h1" variant="h5">
              Личный профиль
            </Typography>
          </Grid>
          <Grid item>
            <h2>Email: {user?.email}</h2>
            <h2>Имя: {user?.firstName}</h2>
            <h2>Фамилия: {user?.lastName}</h2>
          </Grid>
          <Grid item>
            <Button variant="outlined" color="primary" className="gridItem" onClick={handleClickOpen}>
              Изменить
            </Button>
          </Grid>
        </Grid>
        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">Редактирование личного профиля</DialogTitle>
          <DialogContent>
            <DialogContentText>Введите Ваши новые данные:</DialogContentText>
            <Grid container spacing={1} className="grid">
              <CustomTextField
                id="firstName"
                label={t('test.chlen')}
                name="firstName"
                type="text"
                autoComplete="Имя"
                helperText=""
                formik={formik}
              />
              <CustomTextField
                id="lastName"
                label={t('lastName')}
                name="lastName"
                type="text"
                autoComplete="Фамилия"
                helperText=""
                formik={formik}
              />
              <CustomTextField
                id="email"
                label={t('email')}
                name="email"
                type="email"
                autoComplete="Почта"
                helperText=""
                formik={formik}
              />
            </Grid>
            {/* <TextField autoFocus margin="dense" id="email" label="Email" type="email" formik={formik} fullWidth />
            <TextField margin="dense" id="firstName" label="Имя" type="text" formik={formik} fullWidth />
            <TextField margin="dense" id="lastName" label="Фамилия" type="text" formik={formik} fullWidth /> */}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Отмена
            </Button>
            <Button onClick={handleClose} color="primary">
              Сохранить
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
      {serverError && (
        <Alert variant="filled" severity="error">
          {serverError}
        </Alert>
      )}
    </>
  );
};
