import React from 'react';
import TextField from '@material-ui/core/TextField';
import PropTypes from 'prop-types';

const CustomTextField = ({ id, label, name, autoComplete, formik, type, helperText, required }) => (
  <>
    <TextField
      variant="outlined"
      margin="normal"
      type={type}
      required={required}
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
  required: PropTypes.bool,
  type: PropTypes.string,
};

CustomTextField.defaultProps = {
  autoComplete: 'somestring',
  formik: 'somestring',
  helperText: 'somestring',
  id: 'somestring',
  label: 'somestring',
  name: 'somestring',
  required: true,
  type: 'somestring',
};

export default CustomTextField;
