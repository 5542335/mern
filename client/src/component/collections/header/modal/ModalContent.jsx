import React, { useCallback } from 'react';
import TextField from '@material-ui/core/TextField';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import './modal.css';

export const ModalContent = ({ setOpen, disableBtn, setDisableBtn, collections, setCollections, setAlert }) => {
  const { _id: id } = useSelector((state) => state.user) || {};

  const commentStroke = useCallback((event) => {
    const currMessage = event.target.value;

    if (currMessage) {
      setDisableBtn(false);
    } else {
      setDisableBtn(true);
    }
  }, []);

  const formik = useFormik({
    initialValues: { collectionName: '' },
    onSubmit: async (values, { setValues }) => {
      try {
        setValues({ collectionName: '' });

        if (!Object.keys(collections).includes(values.collectionName)) {
          const response = await fetch('/api/collections/create', {
            body: JSON.stringify({ ...values, userId: id }),
            headers: {
              'Content-Type': 'application/json;charset=utf-8',
            },
            method: 'POST',
          });
          const data = await response.json();

          const newCollections = { ...collections };

          newCollections[data.collectionName] = [data.repoIds];

          if (response.ok) {
            setCollections(newCollections);
          }

          setOpen(false);
        } else {
          setOpen(false);
          setAlert(true);
        }
      } catch (error) {
        console.log(error);
      }
    },

    validationSchema: Yup.object({
      collectionName: Yup.string(),
    }),
  });

  const handleCancelBtn = useCallback(() => {
    formik.setValues({ collectionName: '' });
    setOpen(false);
  }, [formik]);

  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <div className="modalTitle">
          <h2>Создание новой коллекции</h2>
        </div>
        <div className="modalInput">
          <TextField
            id="collectionName"
            name="collectionName"
            label="Введите название..."
            variant="outlined"
            onKeyUp={commentStroke}
            fullWidth
            onChange={formik.handleChange}
            value={formik.values.collectionName}
          />
        </div>
        <div>
          <button type="submit" id="createBtn" disabled={disableBtn}>
            Создать
          </button>
          <button type="button" id="cancelBtn" onClick={handleCancelBtn}>
            Отмена
          </button>
        </div>
      </form>
    </>
  );
};

ModalContent.propTypes = {
  collections: PropTypes.string.isRequired,
  disableBtn: PropTypes.bool.isRequired,
  setAlert: PropTypes.func.isRequired,
  setCollections: PropTypes.func.isRequired,
  setDisableBtn: PropTypes.func.isRequired,
  setOpen: PropTypes.func.isRequired,
};
