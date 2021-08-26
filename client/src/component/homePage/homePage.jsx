import React, { useCallback, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { gql, useQuery } from '@apollo/client';
import TablePagination from '@material-ui/core/TablePagination';
import { NavLink } from 'react-router-dom';
import TableFooter from '@material-ui/core/TableFooter';

import { SearchInput } from './SearchInputs';
import { SimpleBackdrop } from '../shared/loading/BackDrop';
import { TablePaginationActions } from './TablePaginationActions';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  tableCell: {
    backgroundColor: '#F8F8F8',
  },
  tableCell1: {
    width: '20%',
  },
  tableCell2: {
    width: '12%',
  },
  tableHead: {
    backgroundColor: 'Gainsboro',
  },
});

const gererateQuery = (name, topic, language, rowsPerPage, cursor) => {
  const nameQuery = name ? `, ${name} in:name` : '';
  const topicQuery = topic ? `, topic:${topic}` : '';
  const languageQuery = language ? `, language:${language}` : '';

  return `query: "is:public${nameQuery}${topicQuery}${languageQuery}", type: REPOSITORY,first: ${rowsPerPage}, after: "${cursor}"`;
};

const GET_REPOS = (query) => gql`
  {
    search(${query}) {
      repositoryCount
      edges {
        cursor
        node {
          ... on Repository {
            name
            description
            owner {
              login
            }
            languages(first: 5) {
              nodes {
                name
              }
            }
            repositoryTopics(first: 5) {
              nodes {
                topic {
                  name
                }
              }
            }
            releases(first: 5) {
              nodes {
                name
              }
            }
          }
        }
      }
    }
  }
`;

export const HomePage = () => {
  const classes = useStyles();
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [cursor, setCursor] = useState('Y3Vyc29yOjE=');
  const [name, setName] = useState('');
  const [topic, setTopic] = useState('');
  const [language, setLanguage] = useState('');
  const { data, loading, error } = useQuery(GET_REPOS(gererateQuery(name, topic, language, rowsPerPage, cursor)));
  const [page, setPage] = useState(0);

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

  const searchName = useCallback((e) => setName(e.target.value), [setName]);
  const searchTopic = useCallback((e) => setTopic(e.target.value), [setTopic]);
  const searchLanguage = useCallback((e) => setLanguage(e.target.value), [setLanguage]);

  if (error) return `Error! ${error.message}`;

  return (
    <>
      {loading && <SimpleBackdrop />}
      <TableContainer component={Paper} className={classes.container}>
        <Table className={classes.table} size="small" aria-label="a dense table">
          <TableHead className={classes.tableHead}>
            <TableRow>
              <TableCell className={classes.tableCell1}>
                <SearchInput label="Имя репозитория" onChange={searchName} />
              </TableCell>
              <TableCell align="center">Описание</TableCell>
              <TableCell align="right">
                <SearchInput label="Автор" />
              </TableCell>
              <TableCell align="right">Последний релиз</TableCell>
              <TableCell align="center" className={classes.tableCell2}>
                <SearchInput label="Топики" onChange={searchTopic} />
              </TableCell>
              <TableCell align="left" className={classes.tableCell1}>
                <SearchInput label="Языки программирования" onChange={searchLanguage} />
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.search.edges.map(({ node }) => (
              <TableRow key={node.name}>
                <TableCell component="th" scope="row">
                  <NavLink
                    to={{
                      pathname: `/${node.owner.login}/${node.name}`,
                    }}
                  >
                    {node.name}
                  </NavLink>
                </TableCell>
                <TableCell align="right" className={classes.tableCell}>
                  {node.description}
                </TableCell>
                <TableCell align="right">{node.owner.login}</TableCell>
                <TableCell align="right" className={classes.tableCell}>
                  {node.releases.nodes[node.releases.nodes.length - 1]?.name}
                </TableCell>
                <TableCell align="right">
                  {node.repositoryTopics.nodes.reduce(
                    (result, { topic: { name: topicName } }) => `${result}, ${topicName}`.replace(/^,*/, ''),
                    '',
                  )}
                </TableCell>
                <TableCell align="right" className={classes.tableCell}>
                  {node.languages.nodes.reduce(
                    (result, { name: languageName }) => `${result}, ${languageName}`.replace(/^,*/, ''),
                    '',
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
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
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </>
  );
};
