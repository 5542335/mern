import React, { useState, useCallback } from 'react';
import Button from '@material-ui/core/Button';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import { EditProfile } from './editProfile';
import { EditPass } from './editPass';
import './profile.css';

export const Profile = () => {
  const userStore = useSelector((state) => state.user);
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

  const { _id: id } = userStore || {};

  return (
    <>
      <div className="profile-container">
        <div className="profile">
          <div className="title">{t('profile.profile')}</div>

          <div className="email">{t('register.email')}:</div>
          <div className="emailValue">{userStore?.email}</div>
          <div className="firstName">{t('register.firstName')}:</div>
          <div className="firstNameValue">{userStore?.firstName}</div>
          <div className="lastName">{t('register.lastName')}:</div>
          <div className="lastNameValue">{userStore?.lastName}</div>

          <div className="buttons">
            <Button variant="outlined" color="primary" className="gridItem" onClick={handleClickOpen}>
              {/* {t('edit')} */} Редактировать
            </Button>
            <Button variant="outlined" color="primary" className="gridItem" onClick={handleClickOpenPass}>
              Изменить пароль
            </Button>
          </div>

          <EditProfile open={open} onClose={handleClose} userId={id} />
          <EditPass open={openPass} onClose={handleClosePass} userId={id} />
        </div>
      </div>
    </>
  );
};
