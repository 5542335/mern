import React from "react";
import { ErrorMessage, useFormik } from "formik";
import * as Yup from "yup";
import CustomTextField from "./component/registerForm/body/body";
import TitleRegisterForm from "./component/registerForm/title/Title";
import SubmitButton from "./component/registerForm/submitSection/SubmitButton";
import GoogleLogin from "react-google-login";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import Agreements from "./component/registerForm/body/agreement";

const responseGoogle = (response) => {
  console.log(response);
};

const SignupForm = () => {
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      password: "",
      email: "",
    },
    validationSchema: Yup.object({
      firstName: Yup.string()
        .matches(/[a-zA-Z]/, "Имя должно содержать только латинские символы")
        .max(32, "Максимум 32 символа")
        .required("Обязательное поле"),
      lastName: Yup.string()
        .matches(
          /[a-zA-Z]/,
          "Фамилия должна содержать только латинские символы"
        )
        .max(32, "Максимум 32 символа")
        .required("Обязательное поле"),
      password: Yup.string()
        .matches(
          /^.*(?=.{8,32})(?=.*[!@#$%^&*()\-_=+{};:,<.>]{4})((?=.*[A-Z]){1}).*$/,
          "Пароль должен быть от 8 до 32 символов, одна буква в верхнем регистре, 4 спецсимвола"
        )
        .required("Обязательное поле"),
      email: Yup.string()
        .email("Неверный email адрес")
        .required("Обязательное поле"),
    }),
    onSubmit: (values) => {},
  });

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className="form">
        <form onSubmit={formik.handleSubmit}>
          <TitleRegisterForm titleText="Регистрация" />

          <CustomTextField
            id="firstName"
            label="Имя"
            name="firstName"
            type="text"
            autoComplete="Имя"
            helperText=""
            formik={formik}
          />
          <CustomTextField
            id="lastName"
            label="Фамилия"
            name="lastName"
            type="text"
            autoComplete="Фамилия"
            helperText=""
            formik={formik}
          />
          <CustomTextField
            id="password"
            label="Пароль"
            name="password"
            type="password"
            autoComplete="Пароль"
            helperText=""
            formik={formik}
          />
          <CustomTextField
            id="email"
            label="Почта"
            name="email"
            type="email"
            autoComplete="Почта"
            helperText=""
            formik={formik}
          />
          <Agreements />

          <SubmitButton color="primary" submitButtonText="Зарегистрироваться" />

          <GoogleLogin
            clientId="631572139627-994glqmtsdnvjkaf5g7qo450mvhptbb5.apps.googleusercontent.com"
            buttonText="Войти через Google"
            onSuccess={responseGoogle}
            onFailure={responseGoogle}
          />
        </form>
      </div>
    </Container>
  );
};

export default SignupForm;
