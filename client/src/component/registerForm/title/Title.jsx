import React from "react";
import Typography from "@material-ui/core/Typography";
import { useTranslation } from "react-i18next";
import PropTypes from "prop-types";

const TitleRegisterForm = ({ component = "h1", variant = "h5" }) => {
  const { t } = useTranslation();

  return (
    <Typography component={component} variant={variant}>
      {t("registrationTitle")}
    </Typography>
  );
};

TitleRegisterForm.propTypes = {
  component: PropTypes.string,
  variant: PropTypes.string,
};

TitleRegisterForm.defaultProps = {
  component: "somestring",
  variant: "somestring",
};

export default TitleRegisterForm;
