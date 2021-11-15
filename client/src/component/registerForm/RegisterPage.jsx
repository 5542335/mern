import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useTranslation } from 'react-i18next';
import { Container, Grid } from '@material-ui/core';
import { NavLink } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@material-ui/core/styles';
import { teal } from '@material-ui/core/colors';
import { useDispatch } from 'react-redux';

import { CustomButton } from '../shared/buttons/CustomButton';
import CustomTextField from '../shared/customTextField/CustomTextField';
import TitleRegisterForm from '../shared/formTitle/Title';
import Agreements from './body/Agreement';
import './registerPage.css';
import { register } from '../../store/actions/auth';

const nameRegex = new RegExp(/[a-zA-Z]/);
const passwordRegex = new RegExp(/^.*(?=.{8,32})(?=.*[!@#$%^&*()-_=+{};:,<.>]{4})((?=.*[A-Z]){1}).*$/);

export const SignupForm = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const formik = useFormik({
    initialValues: {
      acceptedTerms: false,
      active: true,
      email: '',
      firstName: '',
      lastName: '',
      password: '',
      role: 'user',
    },
    onSubmit: (values) => {
      dispatch(register(values));
    },

    validationSchema: Yup.object({
      acceptedTerms: Yup.boolean()
        .required(t('validation.required'))
        .oneOf([true], 'You must accept the terms and conditions.'),
      email: Yup.string().email(t('validation.invalidEmail')).required(t('validation.required')),
      firstName: Yup.string()
        .matches(nameRegex, t('validation.nameMatches'))
        .max(32, t('validation.nameMaxLength'))
        .required(t('validation.required')),
      lastName: Yup.string()
        .matches(nameRegex, t('validation.nameMatches'))
        .max(32, t('validation.nameMaxLength'))
        .required(t('validation.required')),
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
      <Container component="main" maxWidth="xs" className="container">
        <div>
          <form onSubmit={formik.handleSubmit}>
            <Grid container className="grid">
              <TitleRegisterForm text={t('register.registerTitle')} />
            </Grid>
            <Grid container spacing={1} className="grid">
              <Grid item xs={12} sm={7} md={5}>
                <ThemeProvider theme={theme}>
                  <CustomTextField
                    id="firstName"
                    label={t('register.firstName')}
                    name="firstName"
                    type="text"
                    autoComplete="Имя"
                    helperText=""
                    formik={formik}
                  />
                </ThemeProvider>
              </Grid>
              <Grid item xs={12} sm={7} md={5}>
                <ThemeProvider theme={theme}>
                  <CustomTextField
                    id="lastName"
                    label={t('register.lastName')}
                    name="lastName"
                    type="text"
                    autoComplete="Фамилия"
                    helperText=""
                    formik={formik}
                  />
                </ThemeProvider>
              </Grid>
              <Grid item xs={12} sm={7} md={5}>
                <ThemeProvider theme={theme}>
                  <CustomTextField
                    id="email"
                    label={t('register.email')}
                    name="email"
                    type="email"
                    autoComplete="Почта"
                    helperText=""
                    formik={formik}
                  />
                </ThemeProvider>
              </Grid>
              <Grid item xs={12} sm={7} md={5}>
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
            <Grid container className="grid">
              <Agreements onChange={formik.handleChange} value={formik.values.acceptedTerms} />
            </Grid>
            <Grid container className="grid">
              <NavLink to="/auth">{t('register.haveAccount')}</NavLink>
            </Grid>
            <Grid container spacing={1} className="grid">
              <Grid item xs={6} className="gridItem">
                <CustomButton htmlType="submit" disabled={!formik.isValid || !formik.dirty}>
                  Зарегистрироваться
                </CustomButton>
              </Grid>
            </Grid>
          </form>
        </div>
        <NavLink to="/">{t('register.toHome')}</NavLink>
      </Container>
    </>
  );
};
