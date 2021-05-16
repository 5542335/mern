import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import GoogleLogin from 'react-google-login';
import { CssBaseline, Container, Grid } from '@material-ui/core';
// import { useTranslation } from "react-i18next";

import CustomTextField from './component/registerForm/body/body';
import TitleRegisterForm from './component/registerForm/title/Title';
import SubmitButton from './component/registerForm/submitSection/SubmitButton';
import Agreements from './component/registerForm/body/agreement';
import './index.css';

const responseGoogle = (response) => {
  console.log(response);
};

const nameRegex = new RegExp(/[a-zA-Z]/);

const passwordRegex = new RegExp(
  /^.*(?=.{8,32})(?=.*[!@#$%^&*()-_=+{};:,<.>]{4})((?=.*[A-Z]){1}).*$/
);

// const { t } = useTranslation();

const SignupForm = () => {
  const formik = useFormik({
    initialValues: {
      email: '',
      firstName: '',
      lastName: '',
      password: '',
    },
    onSubmit: (values) => {
      fetch('http://localhost:5000/api/auth/register', {
        body: values,
        method: 'POST',
      });
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email('Неверный email адрес')
        .required('Обязательное поле'),
      firstName: Yup.string()
        .matches(nameRegex, 'Имя должно содержать только латинские символы')
        .max(32, 'Максимум 32 символа')
        .required('Обязательное поле'),
      lastName: Yup.string()
        .matches(nameRegex, 'Фамилия должна содержать только латинские символы')
        .max(32, 'Максимум 32 символа')
        .required('Обязательное поле'),
      password: Yup.string()
        .matches(
          passwordRegex,
          'Пароль должен быть от 8 до 32 символов, одна буква в верхнем регистре, 4 спецсимвола'
        )
        .required('Обязательное поле'),
    }),
  });

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div>
        <form onSubmit={formik.handleSubmit}>
          <Grid container className="grid">
            <TitleRegisterForm />
          </Grid>
          <Grid container spacing={1} className="grid">
            <Grid item xs={12} sm={7} md={5}>
              <CustomTextField
                id="firstName"
                label="Имя"
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
                label="Фамилия"
                name="lastName"
                type="text"
                autoComplete="Фамилия"
                helperText=""
                formik={formik}
              />
            </Grid>

            <Grid item xs={12} sm={7} md={5}>
              <CustomTextField
                id="password"
                label="Пароль"
                name="password"
                type="password"
                autoComplete="Пароль"
                helperText=""
                formik={formik}
              />
            </Grid>
            <Grid item xs={12} sm={7} md={5}>
              <CustomTextField
                id="email"
                label="Почта"
                name="email"
                type="email"
                autoComplete="Почта"
                helperText=""
                formik={formik}
              />
            </Grid>
          </Grid>
          <Grid container className="grid">
            <Grid item>
              <Agreements />
            </Grid>
          </Grid>

          <Grid container spacing={1} className="grid">
            <Grid item xs={6}>
              <SubmitButton color="primary" />

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
    </Container>
  );
};

export default SignupForm;
