import React from "react";
import Button from "@material-ui/core/Button";
import { useTranslation } from "react-i18next";

const SubmitButton = ({ type = "submit", variant = "contained", color }) => {
  const { t } = useTranslation();
  return (
    <Button type={type} variant={variant} color={color}>
      {t("registration")}
    </Button>
  );
};

export default SubmitButton;
