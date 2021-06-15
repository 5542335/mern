import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useTranslation } from 'react-i18next';
import GoogleLogin from 'react-google-login';
import { CssBaseline, Container, Grid } from '@material-ui/core';
import Cookies from 'universal-cookie';
import { Alert } from '@material-ui/lab';
import { NavLink, useHistory } from 'react-router-dom';

import CustomTextField from './body/body';
import TitleRegisterForm from './title/Title';
import SubmitButton from './submitSection/SubmitButton';
import SwitchLanguage from '../homePage/header/switchLangButton';
import '../../index.css';

const responseGoogle = (response) => {
  console.log(response);
};
const passwordRegex = new RegExp(/^.*(?=.{8,32})(?=.*[!@#$%^&*()-_=+{};:,<.>]{4})((?=.*[A-Z]){1}).*$/);

export const AuthForm = () => {
  const [serverError, setServerError] = useState(null);
  const cookies = new Cookies();
  const history = useHistory();
  const { t } = useTranslation();
  const formik = useFormik({
    initialValues: { email: '', password: '' },
    onSubmit: async (values) => {
      try {
        const response = await fetch('/api/auth/login', {
          body: JSON.stringify(values),
          headers: {
            'Content-Type': 'application/json;charset=utf-8',
          },
          method: 'POST',
        });
        const data = await response.json();

        if (response.ok) {
          const { token } = data;

          cookies.set('token', token);

          history.push('/');
          const { message } = data;

          setServerError(message);
        }
      } catch (error) {
        console.log(error);
      }
    },

    validationSchema: Yup.object({
      email: Yup.string().email(t('invalidEmail')).required(t('required')),
      password: Yup.string().matches(passwordRegex, t('passwordMatches')).required(t('required')),
    }),
  });

  return (
    <>
      <Container component="main" maxWidth="xs" className="container">
        <CssBaseline />
        <div>
          <form onSubmit={formik.handleSubmit}>
            <Grid container className="grid">
              <SwitchLanguage />
            </Grid>
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
                  autoFocus="false"
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
              <NavLink to="/register">{t('noAccount')}</NavLink>
            </Grid>
            <Grid container spacing={1} className="grid">
              <Grid item xs={6} className="gridItem">
                <SubmitButton disabled={!formik.isValid || !formik.dirty} color="primary" />
                <GoogleLogin
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
      {serverError && (
        <Alert variant="filled" severity="error">
          {serverError}
        </Alert>
      )}
    </>
  );
};
