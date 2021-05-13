import React from "react";
import TextField from "@material-ui/core/TextField";
//import { ErrorMessage, useFormik } from "formik";
//import FormControlLabel from "@material-ui/core/FormControlLabel";

// const errorValidation = () => {
//   return (
//     <TextField
//       error
//       id="outlined-error-helper-text"
//       label="Error"
//       defaultValue="Hello World"
//       helperText="Incorrect entry."
//       variant="outlined"
//     />
//   );
// };

const CustomTextField = ({
  id,
  label,
  name,
  autoComplete,
  formik,
  type,
  helperText,
  //error,
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
      //error={formik.errors[id]}
    />
    {formik.touched[id] && formik.errors[id] ? (
      <div>{formik.errors[id]}</div>
    ) : null}
  </>
);

export default CustomTextField;
