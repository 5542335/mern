import React, { useCallback, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';

import { alertAction } from '../../../store/actions/alert';
import { uploadAvatarAction } from '../../../store/actions/user';
import styles from './editAvatar.module.css';
import { CustomButton } from '../../shared/buttons/CustomButton';

export const EditAvatar = ({ setOpenAva }) => {
  const [url, setUrl] = useState('');
  const hiddenFileInput = useRef(null);
  const dispatch = useDispatch();

  const uploadImage = useCallback(
    async (e) => {
      try {
        const data = new FormData();

        data.append('file', e.target.files[0]);
        data.append('upload_preset', 'alexmern');
        data.append('cloud_name', 'alexmern');
        const response = await fetch('  https://api.cloudinary.com/v1_1/alexmern/image/upload', {
          body: data,
          method: 'post',
        });

        if (response.ok) {
          const toJSON = await response.json();

          setUrl(toJSON.url);
        }
      } catch (error) {
        dispatch(alertAction(`Ошибка (${JSON.stringify(error)})`, true, 'error'));
      }
    },
    [dispatch],
  );

  const handleCancel = useCallback(() => {
    setOpenAva(false);
    setUrl('');
  }, [setOpenAva]);

  const handleAddAvatar = useCallback(() => {
    hiddenFileInput.current.click();
  }, []);

  const changeAvatar = useCallback(() => {
    dispatch(uploadAvatarAction(url));
    setOpenAva(false);
    setUrl('');
  }, [url, dispatch, setOpenAva]);

  return (
    <div className={styles.container}>
      <div className={styles.chooseFile}>
        <CustomButton type="secondary" onClick={handleAddAvatar}>
          <img src="https://img.icons8.com/color/16/000000/add--v1.png" alt="" />
          Выбрать изображение
        </CustomButton>
        <input ref={hiddenFileInput} type="file" onChange={uploadImage} hidden />
      </div>
      <div className={styles.image}>
        <img alt="" src={url} height="150" width="150" />
      </div>
      <div className={styles.buttons}>
        <CustomButton htmlType="submit" onClick={changeAvatar} disabled={!url}>
          Изменить аватар
        </CustomButton>
        <CustomButton type="secondary" onClick={handleCancel}>
          Отмена
        </CustomButton>
      </div>
    </div>
  );
};

EditAvatar.propTypes = {
  setOpenAva: PropTypes.func.isRequired,
};
