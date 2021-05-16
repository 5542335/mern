import React from "react";
import TextField from "@material-ui/core/TextField";
import PropTypes from "prop-types";

const CustomTextField = ({ id, label, name, autoComplete, formik, type, helperText }) => (
  <>
    <TextField
      variant="outlined"
      margin="normal"
      type={type}
      required
      fullWidth
      id={id}
      label={label}
      name={name}
      autoComplete={autoComplete}
      helperText={helperText}
      onChange={formik.handleChange}
      onBlur={formik.handleBlur}
      value={formik.values[id]}
      error={formik.errors[id]}
    />
    {formik.touched[id] && formik.errors[id] ? <div>{formik.errors[id]}</div> : null}
  </>
);

CustomTextField.propTypes = {
  autoComplete: PropTypes.string,
  formik: PropTypes.string,
  helperText: PropTypes.string,
  id: PropTypes.string,
  label: PropTypes.string,
  name: PropTypes.string,
  type: PropTypes.string,
};

CustomTextField.defaultProps = {
  autoComplete: "somestring",
  formik: "somestring",
  helperText: "somestring",
  id: "somestring",
  label: "somestring",
  name: "somestring",
  type: "somestring",
};

export default CustomTextField;
