import React from "react";
import TextField from "@material-ui/core/TextField";

const CustomTextField = ({
  id,
  label,
  name,
  autoComplete,
  formik,
  type,
  helperText,
}) => (
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
    {formik.touched[id] && formik.errors[id] ? (
      <div>{formik.errors[id]}</div>
    ) : null}
  </>
);

export default CustomTextField;
