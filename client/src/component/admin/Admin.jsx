import React, { useEffect } from 'react';
import { TableHead, TableCell, TableRow, TableBody } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';

import { updateAllUsersAction, blockUserAction } from '../../store/actions/admin';
import styles from './admin.module.css';
import { CustomButton } from '../shared/buttons/CustomButton';

export const Admin = () => {
  const dispatch = useDispatch();
  const { allUsers } = useSelector((state) => state.admin);

  useEffect(() => {
    dispatch(updateAllUsersAction);
  }, [dispatch]);

  const handleBlockUser = (selectedUser) => async () => {
    dispatch(blockUserAction(selectedUser));
  };

  return (
    <div className={styles.container}>
      <div className={styles.tableContainer}>
        <TableHead>
          <TableRow>
            <TableCell className={styles.tableCellHeader}>Email</TableCell>
            <TableCell className={styles.tableCellHeader}>Имя</TableCell>
            <TableCell className={styles.tableCellHeader}>Фамилия</TableCell>
            <TableCell className={styles.tableCellHeader}>Роли</TableCell>
            <TableCell className={styles.tableCellHeader}>Статус</TableCell>
            <TableCell className={styles.tableCell} />
          </TableRow>
        </TableHead>
        <TableBody>
          {allUsers?.map((item) => (
            <TableRow key={item?.email}>
              <TableCell className={styles.tableCellBody}>{item?.email}</TableCell>
              <TableCell className={styles.tableCellBody}>{item?.firstName}</TableCell>
              <TableCell className={styles.tableCellBody}>{item?.lastName}</TableCell>
              <TableCell className={styles.tableCellBody}>{item?.role.join(', ')}</TableCell>
              <TableCell className={styles.tableCellBody}>
                {item?.active ? <CheckIcon color="primary" /> : <CloseIcon color="error" />}
              </TableCell>
              <TableCell>
                <CustomButton
                  htmlType="submit"
                  onClick={handleBlockUser(item)}
                  type={item?.active ? 'secondary' : 'primary'}
                >
                  {item?.active ? 'Заблокировать' : 'Разблокировать'}
                </CustomButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </div>
    </div>
  );
};
