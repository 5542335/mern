import React from "react";
import Typography from "@material-ui/core/Typography";
import { useTranslation } from "react-i18next";

const TitleRegisterForm = ({ component = "h1", variant = "h5" }) => {
  const { t } = useTranslation();
  return (
    <Typography component={component} variant={variant}>
      {t("registrationTitle")}
    </Typography>
  );
};

export default TitleRegisterForm;
