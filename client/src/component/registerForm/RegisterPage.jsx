import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useTranslation } from 'react-i18next';
import GoogleLogin from 'react-google-login';
import { CssBaseline, Container, Grid } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { NavLink, useHistory } from 'react-router-dom';
import Cookies from 'universal-cookie';

import SwitchLanguage from '../homePage/header/ru-en';
import CustomTextField from './body/body';
import TitleRegisterForm from './title/Title';
import SubmitButton from './submitSection/SubmitButton';
import Agreements from './body/agreement';
import '../../index.css';

const responseGoogle = (response) => {
  console.log(response);
};
const nameRegex = new RegExp(/[a-zA-Z]/);
const passwordRegex = new RegExp(/^.*(?=.{8,32})(?=.*[!@#$%^&*()-_=+{};:,<.>]{4})((?=.*[A-Z]){1}).*$/);

export const SignupForm = () => {
  const [serverError, setServerError] = useState(null);
  // const errorAlert = useCallback(() => {
  //   serverError && (
  //     <Alert variant="filled" severity="error">
  //       {serverError}
  //     </Alert>
  //   );
  // }, []);
  const cookies = new Cookies();
  const history = useHistory();
  const { t } = useTranslation();
  const formik = useFormik({
    initialValues: { acceptedTerms: false, email: '', firstName: '', lastName: '', password: '' },
    onSubmit: async (values) => {
      try {
        const response = await fetch('/api/auth/registration', {
          body: JSON.stringify(values),
          headers: { 'Content-type': 'application/json' },
          method: 'POST',
        });
        const data = await response.json();

        if (response.ok) {
          const { token } = data;

          cookies.set('token', token);

          history.push('/');
        } else {
          const { message } = data;

          setServerError(message);
        }
      } catch (error) {
        console.log(error);
      }
    },

    validationSchema: Yup.object({
      acceptedTerms: Yup.boolean().required(t('required')).oneOf([true], 'You must accept the terms and conditions.')
        .touched,
      email: Yup.string().email('Неверный email адрес').required(t('required')),
      firstName: Yup.string().matches(nameRegex, t('nameMatches')).max(32, t('nameMaxLength')).required(t('required')),
      lastName: Yup.string().matches(nameRegex, t('nameMatches')).max(32, t('nameMaxLength')).required(t('required')),
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
              <Grid item xs={12} sm={7} md={5}>
                <CustomTextField
                  id="firstName"
                  label={t('firstName')}
                  name="firstName"
                  type="text"
                  autoComplete="Имя"
                  helperText=""
                  formik={formik}
                />
              </Grid>
              <Grid item xs={12} sm={7} md={5}>
                <CustomTextField
                  id="lastName"
                  label={t('lastName')}
                  name="lastName"
                  type="text"
                  autoComplete="Фамилия"
                  helperText=""
                  formik={formik}
                />
              </Grid>
              <Grid item xs={12} sm={7} md={5}>
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
              <Grid item xs={12} sm={7} md={5}>
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
              <Agreements onChange={formik.handleChange} value={formik.values.acceptedTerms} />
            </Grid>
            <Grid container className="grid">
              <NavLink to="/auth">{t('haveAccount')}</NavLink>
            </Grid>
            <Grid container spacing={1} className="grid">
              <Grid item xs={6} className="gridItem">
                <SubmitButton disabled={!formik.isValid || !formik.dirty} color="primary" />
                <GoogleLogin
                  clientId="631572139627-994glqmtsdnvjkaf5g7qo450mvhptbb5.apps.googleusercontent.com"
                  buttonText="Sigh up"
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
