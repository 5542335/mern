import React from 'react';
import Button from '@material-ui/core/Button';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';

export const SubmitButton = ({ type = 'submit', variant = 'contained', color, disabled }) => {
  const { t } = useTranslation();

  return (
    <Button disabled={disabled} type={type} variant={variant} color={color}>
      {t('register.registration')}
    </Button>
  );
};

SubmitButton.propTypes = {
  color: PropTypes.string.isRequired,
  disabled: PropTypes.bool.isRequired,
  type: PropTypes.string.isRequired,
  variant: PropTypes.string.isRequired,
};
