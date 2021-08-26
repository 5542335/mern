import React from 'react';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';

const TitleRegisterForm = ({ text }) => (
  <Typography component="h1" variant="h5">
    {text}
  </Typography>
);

TitleRegisterForm.propTypes = {
  text: PropTypes.func.isRequired,
};

export default TitleRegisterForm;
