import React from 'react';
import { useSelector } from 'react-redux';
import { TableRow, TablePagination, TableFooter } from '@material-ui/core';
import PropTypes from 'prop-types';

import { TablePaginationActions } from './TablePaginationActions';

export const TableFooterComponent = ({ page, handleChangePage, handleChangeRowsPerPage, rowsPerPage }) => {
  const { allRepositories } = useSelector((state) => state.repositories);

  return (
    <TableFooter>
      <TableRow>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          colSpan={3}
          count={allRepositories?.search?.repositoryCount || 1}
          rowsPerPage={rowsPerPage}
          page={page}
          SelectProps={{
            inputProps: { 'aria-label': 'rows per page' },
            native: true,
          }}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          ActionsComponent={TablePaginationActions}
        />
      </TableRow>
    </TableFooter>
  );
};

TableFooterComponent.propTypes = {
  handleChangePage: PropTypes.func.isRequired,
  handleChangeRowsPerPage: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};
