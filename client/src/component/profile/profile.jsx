import React from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import { EditAvatar } from './editAvatar/EditAvatar';
import { CustomButton } from '../shared/buttons/CustomButton';
import { CustomModal } from '../shared/modal/CustomModal';
import { EditProfile } from './EditProfile';
import { EditPass } from './EditPass';
import styles from './profile.module.css';
import { closeModal, useProfileData, openEditProfile, openEditPass, openEditAvatar } from './useProfileData';

const defaultAvatarUrl = 'https://img.icons8.com/material-rounded/100/000000/user-male-circle.png';

export const Profile = () => {
  const [state, handleUpdate] = useProfileData();
  const { user } = useSelector((store) => store);
  const { t } = useTranslation();

  return (
    <>
      <div className={styles.profileContainer}>
        <div className={styles.profile}>
          <div className={styles.title}>{t('profile.profile')}</div>
          <div className={styles.avatar} onClick={handleUpdate(openEditAvatar)}>
            <img src={user?.avatar ? user.avatar : defaultAvatarUrl} alt="" />
          </div>
          <div className={styles.email}>{t('register.email')}:</div>
          <div className={styles.emailValue}>{user?.email}</div>
          <div className={styles.firstName}>{t('register.firstName')}:</div>
          <div className={styles.firstNameValue}>{user?.firstName}</div>
          <div className={styles.lastName}>{t('register.lastName')}:</div>
          <div className={styles.lastNameValue}>{user?.lastName}</div>

          <div className={styles.buttons}>
            <CustomButton type="secondary" onClick={handleUpdate(openEditProfile)}>
              Редактировать
            </CustomButton>
            <CustomButton type="secondary" onClick={handleUpdate(openEditPass)}>
              Изменить пароль
            </CustomButton>
          </div>

          <EditProfile open={state.isEditingProfile} onClose={handleUpdate(closeModal)} />
          <EditPass open={state.isEditingPass} onClose={handleUpdate(closeModal)} />
          <CustomModal open={state.isEditingAvatar} onClose={handleUpdate(closeModal)}>
            <EditAvatar setOpenAva={handleUpdate(closeModal)} />
          </CustomModal>
        </div>
      </div>
    </>
  );
};
