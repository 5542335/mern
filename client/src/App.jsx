import React from "react";
import { ErrorMessage, useFormik } from "formik";
import * as Yup from "yup";
import CustomTextField from "./component/registerForm/body/body";
import TitleRegisterForm from "./component/registerForm/title/Title";
import SubmitButton from "./component/registerForm/submitSection/SubmitButton";
import GoogleLogin from "react-google-login";
//import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
//import TextField from "@material-ui/core/TextField";

//import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
//import Link from "@material-ui/core/Link";
//import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
//import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
//import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { DialogActions, DialogContent } from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
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
        .matches(/[a-zA-Z]/, "Password can only contain Latin letters.")
        .max(32, "Must be 15 characters or less")
        .required("Required"),
      lastName: Yup.string()
        .matches(/[a-zA-Z]/, "Password can only contain Latin letters.")
        .max(32, "Must be 20 characters or less")
        .required("Required"),
      password: Yup.string()
        // .matches(/^(?=.*[@$!%*#?&]{4,}$)/, "Минимум 4 спецсимвола")
        .matches(/(?=.*[A-Z])/, "Одна буква в верхнем регистре")
        .matches(/^[a-zA-Z0-9 ]+$/, "Password can only contain Latin letters.")
        .min(8, "Должно быть более 8 символов")
        .max(32, "Must be 15 characters or less")
        .required("Required"),
      email: Yup.string().email("Invalid email address").required("Required"),
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
