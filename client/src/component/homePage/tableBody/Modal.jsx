import React, { useState, useCallback, useMemo, useEffect } from 'react';
import { Chip } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import styles from './tableBody.module.css';
import { CustomButton } from '../../shared/buttons/CustomButton';
import { CustomModal } from '../../shared/modal/CustomModal';
import { addCollectionsAction, getCollectionsAction } from '../../../store/actions/collections';
import { SimpleBackdrop } from '../../shared/loading/BackDrop';

export const ModalComponent = ({ open, setOpen, selectedRowId }) => {
  const { isLoading } = useSelector((state) => state.loading);

  const { allRepositories } = useSelector((state) => state.repositories);
  const { allCollections } = useSelector((state) => state.collections);
  const [selectedCollections, setSelectedCollections] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    const result = [];

    Object.entries(allCollections).forEach((item) => item[1].includes(selectedRowId) && result.push(item[0]));

    setSelectedCollections(result);
  }, [selectedRowId, open, allCollections]);

  const handleClickCollection = (collectionName) => () => {
    if (selectedCollections.includes(collectionName)) {
      const newSelectedCollection = [...selectedCollections];

      const index = newSelectedCollection.indexOf(collectionName);

      newSelectedCollection.splice(index, 1);

      setSelectedCollections(newSelectedCollection);
    } else {
      const newSelectedCollection = selectedCollections.concat(collectionName);

      setSelectedCollections(newSelectedCollection);
    }
  };

  const selectedRepo = useMemo(
    () => allRepositories?.search?.edges?.find((item) => item.node.id === selectedRowId),
    [allRepositories, selectedRowId],
  );

  const handleSendBtn = useCallback(async () => {
    dispatch(addCollectionsAction(selectedCollections, selectedRepo), {
      alertOptions: { successMessage: 'Коллекции добавлены' },
      shouldUseLoader: true,
    });

    dispatch(getCollectionsAction);

    setOpen(false);
  }, [dispatch, selectedCollections, selectedRepo, setOpen]);

  const handleCancelBtn = useCallback(() => {
    setOpen(false);
  }, [setOpen]);

  return (
    <>
      {isLoading && <SimpleBackdrop />}

      <CustomModal open={open} selectedRowId={selectedRowId}>
        <div className={styles.modalContainer}>
          <div className={styles.modalTitle}>
            Добавить репозиторий {`${selectedRepo?.node.name}`} (Автор: {`${selectedRepo?.node.owner.login}`}) в
            коллекцию
          </div>
          <div>
            {allCollections &&
              Object.entries(allCollections).map((item) => (
                <Chip
                  key={item[0]}
                  className={`${selectedCollections?.includes(item[0]) ? styles.selected : ''}`}
                  label={item[0]}
                  clickable={false}
                  onClick={handleClickCollection(item[0])}
                />
              ))}
          </div>

          <div>
            <CustomButton htmlType="submit" onClick={handleSendBtn}>
              Добавить
            </CustomButton>
            <CustomButton type="secondary" onClick={handleCancelBtn}>
              Отмена
            </CustomButton>
          </div>
        </div>
      </CustomModal>
    </>
  );
};

ModalComponent.propTypes = {
  open: PropTypes.bool.isRequired,
  selectedRowId: PropTypes.string.isRequired,
  setOpen: PropTypes.func.isRequired,
};
