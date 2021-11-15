import React, { useCallback, useEffect, useState } from 'react';
import { Table, TableContainer, Paper } from '@material-ui/core';
import { useQuery } from '@apollo/client';
import { useDispatch } from 'react-redux';

import { SimpleBackdrop } from '../shared/loading/BackDrop';
import { TableHeader } from './tableHeader/TableHeader';
import { TableBodyComponent } from './tableBody/TableBody';
import useHeaderFilters from './hooks/useHeaderFilters';
import { GET_REPOS } from '../../queries/githubQueryForHomePage';
import { TableFooterComponent } from './tableFooter/TableFooter';
import { updateAllRepositories } from '../../store/actions/repositories/actionTypes';
import styles from './homePage.module.css';
import { ModalComponent } from './tableBody/Modal';
import { getLikedRepoIdsAction } from '../../store/actions/repositories';
import { getCollectionsAction } from '../../store/actions/collections';

const gererateQuery = (name, topic, language, rowsPerPage, cursor) => {
  const nameQuery = name ? `, ${name} in:name` : '';
  const topicQuery = topic ? `, topic:${topic}` : '';
  const languageQuery = language ? `, language:${language}` : '';

  return `query: "is:public${nameQuery}${topicQuery}${languageQuery}", type: REPOSITORY,first: ${rowsPerPage}, after: "${cursor}"`;
};

export const HomePage = () => {
  const dispatch = useDispatch();
  const { language, topic, name, searchLanguage, searchName, searchTopic } = useHeaderFilters();
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [cursor, setCursor] = useState('Y3Vyc29yOjE=');
  const { data, loading, error } = useQuery(GET_REPOS(gererateQuery(name, topic, language, rowsPerPage, cursor)), {
    notifyOnNetworkStatusChange: true,
    onCompleted: (allRepositories) => {
      dispatch({ payload: allRepositories, type: updateAllRepositories });
    },
  });

  const [page, setPage] = useState(0);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedRowId, setSelectedRowId] = useState('');
  const [open, setOpen] = useState(false);

  useEffect(() => {
    dispatch(getLikedRepoIdsAction);
  }, [anchorEl, dispatch]);

  useEffect(() => {
    dispatch(getCollectionsAction);
  }, [dispatch]);

  const handleChangePage = useCallback(
    (event, newPage) => {
      setPage(newPage);
      setCursor(data.search.edges[data.search.edges.length - 1].cursor);
    },
    [setPage, setCursor, data],
  );

  const handleChangeRowsPerPage = useCallback((event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  }, []);

  if (error) return `Error! ${error.message}`;

  return (
    <>
      {loading && <SimpleBackdrop />}
      <TableContainer component={Paper}>
        <Table className={styles.table} size="small" aria-label="a dense table">
          <TableHeader
            selectedRowId={selectedRowId}
            searchName={searchName}
            searchLanguage={searchLanguage}
            searchTopic={searchTopic}
          />
          <TableBodyComponent
            selectedRowId={selectedRowId}
            anchorEl={anchorEl}
            setOpen={setOpen}
            setAnchorEl={setAnchorEl}
            setSelectedRowId={setSelectedRowId}
          />
          <TableFooterComponent
            page={page}
            handleChangePage={handleChangePage}
            handleChangeRowsPerPage={handleChangeRowsPerPage}
            rowsPerPage={rowsPerPage}
          />
        </Table>
      </TableContainer>
      <ModalComponent open={open} selectedRowId={selectedRowId} setOpen={setOpen} />
    </>
  );
};
