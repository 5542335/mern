import React, { useCallback, useEffect, useState } from 'react';
import { Table, TableContainer, TableRow, Paper, TablePagination, TableFooter, Chip } from '@material-ui/core';
import { useQuery } from '@apollo/client';
import { useSelector } from 'react-redux';

import { SimpleBackdrop } from '../shared/loading/BackDrop';
import { TablePaginationActions } from './TablePaginationActions';
import { Modal } from '../collections/header/modal/Modal';
import { TableHeader } from './tableHeader/TableHeader';
import { TableBody } from './tableBody/TableBody';
import useHeaderFilters from './hooks/useHeaderFilters';
import { GET_REPOS } from '../../queries/githubGetReposQuery';
import styles from './homePage.module.css';

const gererateQuery = (name, topic, language, rowsPerPage, cursor) => {
  const nameQuery = name ? `, ${name} in:name` : '';
  const topicQuery = topic ? `, topic:${topic}` : '';
  const languageQuery = language ? `, language:${language}` : '';

  return `query: "is:public${nameQuery}${topicQuery}${languageQuery}", type: REPOSITORY,first: ${rowsPerPage}, after: "${cursor}"`;
};

export const HomePage = () => {
  const tokenStore = useSelector((state) => state.token);
  const userStore = useSelector((state) => state.user);
  const { language, topic, name, searchLanguage, searchName, searchTopic } = useHeaderFilters();
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [cursor, setCursor] = useState('Y3Vyc29yOjE=');
  const { data, loading, error } = useQuery(GET_REPOS(gererateQuery(name, topic, language, rowsPerPage, cursor)));
  const [page, setPage] = useState(0);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedRowId, setSelectedRowId] = useState('');
  const [allLikedRepoIds, setAllLikedRepoIds] = useState([]);
  const [open, setOpen] = useState(false);
  const [collections, setCollections] = useState();
  const [selectedCollection, setSelectedCollection] = useState([]);

  useEffect(() => {
    const getAllLikedRepo = async () => {
      const response = await fetch(`api/user/getLikedRepoIds?token=${tokenStore}`);
      const formatResponse = await response.json();

      // if (response.status === 401) {
      //   const refsreshTokenResponse = await fetch(`api/auth/refresh-token?token=${tokenStore}`);
      //   const newToken = await refsreshTokenResponse.json();

      //   console.log(newToken);
      // }

      setAllLikedRepoIds(formatResponse);
    };

    getAllLikedRepo();
  }, [anchorEl]);

  useEffect(() => {
    const getCollections = async () => {
      const collectionRow = await fetch(`api/collections/getCollections?token=${tokenStore}`);
      const collectionRowToJSON = await collectionRow.json();

      setCollections(collectionRowToJSON);
    };

    getCollections();
  }, []);

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

  const handleClickCollection = (collectionName) => () => {
    if (selectedCollection.includes(collectionName)) {
      const newSelectedCollection = [...selectedCollection];

      const index = newSelectedCollection.indexOf(collectionName);

      newSelectedCollection.splice(index, 1);

      setSelectedCollection(newSelectedCollection);
    } else {
      const newSelectedCollection = selectedCollection.concat(collectionName);

      setSelectedCollection(newSelectedCollection);
    }
  };

  const selectedRepo = data?.search?.edges?.find((item) => item.node.id === selectedRowId);
  const collectionsForSendStr = selectedCollection.join(',');
  const { _id: id } = userStore || {};

  const handleSendBtn = useCallback(async () => {
    const response = await fetch('/api/collections/add', {
      body: JSON.stringify({
        collectionName: collectionsForSendStr,
        repoId: selectedRepo?.node.id,
        userId: id,
      }),
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      method: 'PATCH',
    });

    if (response.ok) {
      alert('Коллекции добавлены');
    }
  });
  const handleCancelBtn = useCallback(() => {
    setOpen(false);
    setSelectedCollection([]);
  });

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
          <TableBody
            setOpen={setOpen}
            anchorEl={anchorEl}
            setAnchorEl={setAnchorEl}
            setSelectedRowId={setSelectedRowId}
            allLikedRepoIds={allLikedRepoIds}
            data={data}
          />
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                colSpan={3}
                count={data?.search.repositoryCount}
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
              <Modal open={open} selectedRowId={selectedRowId}>
                <div className={styles.modalContainer}>
                  <div className={styles.modalTitle}>
                    Добавить репозиторий {`${selectedRepo?.node.name}`} (Автор: {`${selectedRepo?.node.owner.login}`}) в
                    коллекцию
                  </div>
                  <div>
                    {collections &&
                      Object.keys(collections).map((item) => (
                        <Chip
                          className={`${selectedCollection.includes(item) ? styles.selected : ''}`}
                          label={item}
                          clickable={false}
                          onClick={handleClickCollection(item)}
                        />
                      ))}
                  </div>
                  <div>
                    <button type="submit" className={`${styles.add} ${styles.cancel}`} onClick={handleSendBtn}>
                      Добавить
                    </button>
                    <button type="button" className={styles.cancel} onClick={handleCancelBtn}>
                      Отмена
                    </button>
                  </div>
                </div>
              </Modal>
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </>
  );
};
