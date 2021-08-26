import React, { useEffect, useState, useCallback } from 'react';
import Cookies from 'universal-cookie';
import { Container, Grid } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { useTranslation } from 'react-i18next';

import { EditProfile } from './editProfile';
import { EditPass } from './editPass';

import '../../index.css';

export const Profile = () => {
  const [user, setUser] = useState(null);
  const [open, setOpen] = useState(false);
  const [openPass, setOpenPass] = useState(false);

  const { t } = useTranslation();

  const handleClickOpen = useCallback(() => {
    setOpen(true);
  }, []);

  const handleClose = useCallback(() => {
    setOpen(false);
  }, []);

  const handleClickOpenPass = useCallback(() => {
    setOpenPass(true);
  }, []);

  const handleClosePass = useCallback(() => {
    setOpenPass(false);
  }, []);

  useEffect(() => {
    const cookies = new Cookies();
    const fetchUser = async () => {
      const token = cookies.get('token');
      const userRaw = await fetch(`api/user?token=${token}`);
      const data = await userRaw.json();

      setUser(data);
    };

    fetchUser();
  }, []);

  const { _id: id } = user || {};

  return (
    <>
      <Container maxWidth="sm" className="container">
        <Grid container className="grid">
          <Grid item>
            <Typography component="h1" variant="h5">
              {t('profile.profile')}
            </Typography>
          </Grid>
          <Grid container className="grid">
            <Grid item>
              <h2>
                {t('register.email')}: {user?.email}
              </h2>
              <h2>
                {t('register.firstName')}: {user?.firstName}
              </h2>
              <h2>
                {t('register.lastName')}: {user?.lastName}
              </h2>
            </Grid>
          </Grid>
        </Grid>
        <Grid container className="grid">
          <Button variant="outlined" color="primary" className="gridItem" onClick={handleClickOpen}>
            {t('edit')}
          </Button>
          <Button variant="outlined" color="primary" className="gridItem" onClick={handleClickOpenPass}>
            Изменить пароль
          </Button>
        </Grid>

        <EditProfile open={open} onClose={handleClose} userId={id} setUser={setUser} />
        <EditPass open={openPass} onClose={handleClosePass} userId={id} />
      </Container>
    </>
  );
};
