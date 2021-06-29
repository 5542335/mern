import React from 'react';
import Typography from '@material-ui/core/Typography';
import { useTranslation } from 'react-i18next';

const TitleRegisterForm = () => {
  const { t } = useTranslation();

  return (
    <Typography component="h1" variant="h5">
      {t('register.authTitle')}
    </Typography>
  );
};

export default TitleRegisterForm;
