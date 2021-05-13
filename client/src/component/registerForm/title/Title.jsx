import React from "react";
import Typography from "@material-ui/core/Typography";
import { useTranslation } from "react-i18next";
//import "/mern/client/src/i18n";

const TitleRegisterForm = ({ component = "h1", variant = "h5" }) => {
  const t = useTranslation();
  return (
    <Typography component={component} variant={variant}>
      {t("registration")}
    </Typography>
  );
};

export default TitleRegisterForm;
