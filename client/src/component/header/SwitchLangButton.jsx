import React, { useCallback, useState } from 'react';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { makeStyles } from '@material-ui/core/styles';
import { initReactI18next } from 'react-i18next';

import translationRU from '../../locales/ru/translationRU.json';
import translationEN from '../../locales/en/translationEN.json';
import i18n from '../../i18n';

const useStyles = makeStyles((theme) => ({
  color: {
    backgroundColor: 'orchid',
  },
  palette: {
    primary: 'amber',
    secondary: 'pink',
  },
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
  },
}));

export default function SwitchLanguage() {
  const [disableRuBtn, setDisableRuBtn] = useState(true);
  const [disableEnBtn, setDisableEnBtn] = useState(false);
  const classes = useStyles();

  const handleChangeLanguageRu = useCallback(() => {
    const resources = {
      en: {
        translation: translationEN,
      },
      ru: {
        translation: translationRU,
      },
    };

    i18n.use(initReactI18next).init({
      interpolation: {
        escapeValue: false,
      },

      lng: 'ru',

      resources,
    });
    setDisableRuBtn(true);
    setDisableEnBtn(false);
  }, []);

  const handleChangeLanguageEn = useCallback(() => {
    const resources = {
      en: {
        translation: translationEN,
      },
      ru: {
        translation: translationRU,
      },
    };

    i18n.use(initReactI18next).init({
      interpolation: {
        escapeValue: false,
      },

      lng: 'en',

      resources,
    });
    setDisableEnBtn(true);
    setDisableRuBtn(false);
  }, []);

  return (
    <div className={classes.root}>
      <ButtonGroup variant="contained" color="primary" aria-label="text primary button group">
        <Button className={classes.color} disabled={disableRuBtn} onClick={handleChangeLanguageRu}>
          Ru
        </Button>
        <Button className={classes.color} disabled={disableEnBtn} onClick={handleChangeLanguageEn}>
          En
        </Button>
      </ButtonGroup>
    </div>
  );
}
