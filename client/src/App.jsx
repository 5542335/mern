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
//import Box from "@material-ui/core/Box";
//import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
//import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
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
          <Checkbox
            defaultChecked
            color="primary"
            inputProps={{ "aria-label": "secondary checkbox" }}
          />
          <a href="/privacy.html" target="_blank">
            Я согласен с условиями
          </a>
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

// Пользовательское Соглашение
// Настоящее Пользовательское Соглашение (Далее Соглашение) регулирует отношения между владельцем com (далее savik или Администрация) с одной стороны и пользователем сайта с другой.
// Сайт savik не является средством массовой информации.

// Используя сайт, Вы соглашаетесь с условиями данного соглашения.
// Если Вы не согласны с условиями данного соглашения, не используйте сайт savik!

// Права и обязанности сторон
// Пользователь имеет право:
// - осуществлять поиск информации на сайте
// - получать информацию на сайте
// - использовать информацию сайта в личных некоммерческих целях

// Администрация имеет право:
// - по своему усмотрению и необходимости создавать, изменять, отменять правила
// - ограничивать доступ к любой информации на сайте

// Пользователь обязуется:
// - не нарушать работоспособность сайта
// - не использовать скрипты (программы) для автоматизированного сбора информации и/или взаимодействия с Сайтом и его Сервисами

// Администрация обязуется:
// - поддерживать работоспособность сайта за исключением случаев, когда это невозможно по независящим от Администрации причинам.

// Ответственность сторон
// - администрация не несет никакой ответственности за услуги, предоставляемые третьими лицами
// - в случае возникновения форс-мажорной ситуации (боевые действия, чрезвычайное положение, стихийное бедствие и т. д.) Администрация не гарантирует сохранность информации, размещённой Пользователем, а также бесперебойную работу информационного ресурса

// Условия действия Соглашения
// Данное Соглашение вступает в силу при любом использовании данного сайта.
// Соглашение перестает действовать при появлении его новой версии.
// Администрация оставляет за собой право в одностороннем порядке изменять данное соглашение по своему усмотрению.
// Администрация не оповещает пользователей об изменении в Соглашении.

// Соглашение разработано на базе юридических документов сервиса Правилль
