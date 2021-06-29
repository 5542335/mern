import React, { useState, useEffect } from 'react';
import { Octokit } from '@octokit/core';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
  container: {
    margin: 20,
  },
  table: {
    minWidth: 650,
  },
});

// function createData(name, calories, fat, carbs, protein, some) {
//   return { calories, carbs, fat, name, protein, some };
// }

// const rows = [
//   createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
//   createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
//   createData('Eclair', 262, 16.0, 24, 6.0),
//   createData('Cupcake', 305, 3.7, 67, 4.3),
//   createData('Gingerbread', 356, 16.0, 49, 3.9),
//   createData('Gingerbsrea', 356, 16.0, 49, 3.9),
// ];

export const HomePage = () => {
  const [repos, setRepos] = useState([]);
  const octokit = new Octokit({ auth: process.env.OCTOKIT_AUTH });
  const classes = useStyles();

  useEffect(() => {
    const fetchRepos = async () => {
      const { data } = await octokit.request('GET /repositories');
      // const { data } = await fetch('https://api.github.com/repositories');

      setRepos(data);
    };

    fetchRepos();
  }, []);
  console.log(repos);

  return (
    <>
      <TableContainer component={Paper} className={classes.container}>
        <Table className={classes.table} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell>Имя репозитория</TableCell>
              <TableCell align="right">Автор</TableCell>
              <TableCell align="right">Описание</TableCell>
              <TableCell align="right">Последний релиз</TableCell>
              <TableCell align="right">Топики</TableCell>
              <TableCell align="right">Языки программирования</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {repos.map((rep) => (
              <TableRow key={rep}>
                <TableCell component="th" scope="row">
                  {rep.name}
                </TableCell>
                <TableCell align="right">{rep.owner.login}</TableCell>
                <TableCell align="right">{rep.description}</TableCell>
                <TableCell align="right">{rep.carbs}</TableCell>
                <TableCell align="right">{rep.protein}</TableCell>
                <TableCell align="right">{rep.languages_url}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <div>hello</div>
      <h1>ПРОЧИТАТЬ ПРО ФУНКЦИИ JS!!!!!!!!</h1>
      <h2>Удалить все креды из репозитория, использовать .env</h2>
      <div>
        Добавить таблицу, где будет отображаться имя репозитория, описание, автор, языки программирования (с
        процентами), топики, последний релиз
      </div>
      <div>
        Добавить изменение пароля, для изменения данных пользователя, все поля не должны быть обязательными для
        заполнения. Добавить вывод ошибки для изменения профиля.
      </div>
    </>
  );
};
