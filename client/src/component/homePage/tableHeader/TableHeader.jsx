import React from 'react';
import PropTypes from 'prop-types';
import { TableHead, TableCell, TableRow } from '@material-ui/core';

import { SearchInput } from './SearchInputs';
import styles from './tableHeader.module.css';

export const TableHeader = ({ searchName, searchLanguage, searchTopic }) => (
  <TableHead className={styles.tableHead}>
    <TableRow>
      <TableCell className={styles.tableCell1}>
        <SearchInput label="Имя репозитория" onChange={searchName} />
      </TableCell>
      <TableCell align="center">Описание</TableCell>
      <TableCell align="center">Автор</TableCell>
      <TableCell align="center">Последний релиз</TableCell>
      <TableCell align="center" className={styles.tableCell2}>
        <SearchInput label="Топики" onChange={searchTopic} />
      </TableCell>
      <TableCell align="center" className={styles.tableCell1}>
        <SearchInput label="Исп. языки" onChange={searchLanguage} />
      </TableCell>
      <TableCell className={styles.tableCellOptions} />
      <TableCell className={styles.tableCellOptions} />
    </TableRow>
  </TableHead>
);

TableHeader.propTypes = {
  searchLanguage: PropTypes.func.isRequired,
  searchName: PropTypes.func.isRequired,
  searchTopic: PropTypes.func.isRequired,
};
