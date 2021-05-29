import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useTranslation } from 'react-i18next';
import GoogleLogin from 'react-google-login';
import { CssBaseline, Container, Grid } from '@material-ui/core';
import { NavLink } from 'react-router-dom';

import CustomTextField from './body/body';
import TitleRegisterForm from './title/Title';
import SubmitButton from './submitSection/SubmitButton';
import '../../index.css';

const responseGoogle = (response) => {
  console.log(response);
};
const passwordRegex = new RegExp(/^.*(?=.{8,32})(?=.*[!@#$%^&*()-_=+{};:,<.>]{4})((?=.*[A-Z]){1}).*$/);

export const AuthForm = () => {
  const { t } = useTranslation();
  const formik = useFormik({
    initialValues: { email: '', password: '' },
    onSubmit: (values) => {
      fetch('/api/auth/login', {
        body: JSON.stringify(values),
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
        },
        method: 'POST',
      });
    },

    validationSchema: Yup.object({
      email: Yup.string().email('Неверный email адрес').required(t('required')),
      password: Yup.string().matches(passwordRegex, t('passwordMatches')).required(t('required')),
    }),
  });

  console.log(formik);

  return (
    <>
      <Container component="main" maxWidth="xs" className="container">
        <CssBaseline />
        <div>
          <form onSubmit={formik.handleSubmit}>
            <Grid container className="grid">
              <TitleRegisterForm />
            </Grid>
            <Grid container spacing={1} className="grid">
              <Grid item xs={12}>
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
              <Grid item xs={12}>
                <CustomTextField
                  id="password"
                  label={t('password')}
                  name="password"
                  type="password"
                  autoComplete="Пароль"
                  helperText=""
                  formik={formik}
                />
              </Grid>
            </Grid>
            <Grid container className="grid">
              <NavLink to="/register">Нет аккаунта? Зарегистрируйтесь!</NavLink>
            </Grid>
            <Grid container spacing={1} className="grid">
              <Grid item xs={6} className="gridItem">
                <SubmitButton disabled={!formik.isValid || !formik.dirty} color="primary" />
                <GoogleLogin
                  className="googleLogin"
                  clientId="631572139627-994glqmtsdnvjkaf5g7qo450mvhptbb5.apps.googleusercontent.com"
                  buttonText="Sigh in"
                  onSuccess={responseGoogle}
                  onFailure={responseGoogle}
                />
              </Grid>
            </Grid>
          </form>
        </div>
        <NavLink to="/">На главную</NavLink>
      </Container>
    </>
  );
};
