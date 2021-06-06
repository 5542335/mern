import React from 'react';
import Button from '@material-ui/core/Button';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';

const SubmitButton = ({ type = 'submit', variant = 'contained', color, disabled }) => {
  const { t } = useTranslation();

  return (
    <Button disabled={disabled} type={type} variant={variant} color={color}>
      {t('authorization')}
    </Button>
  );
};

SubmitButton.propTypes = {
  color: PropTypes.string,
  disabled: PropTypes.bool,
  type: PropTypes.string,
  variant: PropTypes.string,
};

SubmitButton.defaultProps = {
  color: 'somestring',
  disabled: false,
  type: 'somestring',
  variant: 'contained',
};

export default SubmitButton;
