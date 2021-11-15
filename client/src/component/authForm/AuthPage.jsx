import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useTranslation } from 'react-i18next';
import GoogleLogin from 'react-google-login';
import { Container, Grid } from '@material-ui/core';
import { NavLink } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@material-ui/core/styles';
import { teal } from '@material-ui/core/colors';
import { useDispatch } from 'react-redux';

import { login } from '../../store/actions/auth';
import { CustomButton } from '../shared/buttons/CustomButton';
import CustomTextField from '../shared/customTextField/CustomTextField';
import TitleRegisterForm from '../shared/formTitle/Title';
import styles from './authPage.module.css';

const responseGoogle = (setGoogleResponse) => (response) => {
  setGoogleResponse(response);
};
const passwordRegex = new RegExp(/^.*(?=.{8,32})(?=.*[!@#$%^&*()-_=+{};:,<.>]{4})((?=.*[A-Z]){1}).*$/);

export const AuthForm = () => {
  const [googleResponse, setGoogleResponse] = useState(null);
  const dispatch = useDispatch();
  // eslint-disable-next-line
  console.log(googleResponse);

  const { t } = useTranslation();
  const formik = useFormik({
    initialValues: { email: '', password: '' },
    onSubmit: async (values) => {
      dispatch(login(values));
    },

    validationSchema: Yup.object({
      email: Yup.string().email(t('validation.invalidEmail')).required(t('validation.required')),
      password: Yup.string().matches(passwordRegex, t('validation.passwordMatches')).required(t('validation.required')),
    }),
  });
  const theme = createTheme({
    palette: {
      primary: teal,
    },
  });

  return (
    <>
      <Container component="main" maxWidth="xs" className={styles.container}>
        <div>
          <form onSubmit={formik.handleSubmit}>
            <Grid container className={styles.grid}>
              <TitleRegisterForm text={t('register.authTitle')} />
            </Grid>
            <Grid container spacing={1} className={styles.grid}>
              <Grid item xs={12}>
                <ThemeProvider theme={theme}>
                  <CustomTextField
                    id="email"
                    label={t('register.email')}
                    name="email"
                    type="email"
                    autoComplete="Почта"
                    helperText=""
                    formik={formik}
                    autoFocus="false"
                  />
                </ThemeProvider>
              </Grid>
              <Grid item xs={12}>
                <ThemeProvider theme={theme}>
                  <CustomTextField
                    id="password"
                    label={t('register.password')}
                    name="password"
                    type="password"
                    autoComplete="Пароль"
                    helperText=""
                    formik={formik}
                  />
                </ThemeProvider>
              </Grid>
            </Grid>
            <Grid container className={styles.grid}>
              <NavLink to="/register">{t('register.noAccount')}</NavLink>
            </Grid>
            <Grid container spacing={1} className={styles.grid}>
              <Grid item xs={6} className={styles.gridItem}>
                <CustomButton htmlType="submit" disabled={!formik.isValid || !formik.dirty}>
                  Войти
                </CustomButton>
                <GoogleLogin
                  clientId="631572139627-994glqmtsdnvjkaf5g7qo450mvhptbb5.apps.googleusercontent.com"
                  buttonText={t('signUp')}
                  onSuccess={responseGoogle(setGoogleResponse)}
                  onFailure={responseGoogle(setGoogleResponse)}
                />
              </Grid>
            </Grid>
          </form>
        </div>
        <NavLink to="/">{t('register.toHome')}</NavLink>
      </Container>
    </>
  );
};
