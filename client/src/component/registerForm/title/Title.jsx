import React from "react";
import Typography from "@material-ui/core/Typography";

const TitleRegisterForm = ({
  component = "h1",
  variant = "h5",

  titleText,
}) => {
  return (
    <Typography component={component} variant={variant}>
      {titleText}
    </Typography>
  );
};

export default TitleRegisterForm;
