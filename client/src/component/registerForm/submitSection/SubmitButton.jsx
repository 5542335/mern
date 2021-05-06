import React from "react";
import Button from "@material-ui/core/Button";

const SubmitButton = ({
  type = "submit",
  variant = "contained",
  color,
  submitButtonText,
}) => {
  return (
    <Button type={type} variant={variant} color={color}>
      {submitButtonText}
    </Button>
  );
};

export default SubmitButton;
