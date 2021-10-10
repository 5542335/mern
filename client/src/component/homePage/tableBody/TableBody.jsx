import React, { useCallback } from 'react';
import { TableCell, TableRow, MenuItem, Menu, IconButton, TableBody } from '@material-ui/core';
import { NavLink } from 'react-router-dom';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

export const TableBodyComponent = ({
  data,
  selectedRowId,
  anchorEl,
  setOpen,
  setAnchorEl,
  setSelectedRowId,
  allLikedRepoIds,
}) => {
  const tokenStore = useSelector((state) => state.token);
  const handleMenuOpen = (id) => (event) => {
    setAnchorEl(event.currentTarget);
    setSelectedRowId(id);
  };

  const handleMenuClose = useCallback(() => {
    setAnchorEl(null);
  }, []);

  const handleAddToCollection = useCallback(() => {
    setOpen(true);
    setAnchorEl(null);
  });

  const fetchLikeRepo = async (path, id) => {
    await fetch(`/api/user/${path}?token=${tokenStore}`, {
      body: JSON.stringify({ repositoryId: id, token: tokenStore }),
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      method: 'PATCH',
    });
  };

  const handleAddToFavorite = (id) => () => {
    if (allLikedRepoIds?.includes(selectedRowId)) {
      fetchLikeRepo('dislike', id);
      setAnchorEl(null);
    } else {
      fetchLikeRepo('like', id);
      setAnchorEl(null);
    }
  };

  return (
    <>
      <TableBody>
        {data?.search.edges.map(({ node }) => (
          <TableRow key={node.name}>
            <TableCell>{allLikedRepoIds?.includes(node.id) && <FavoriteIcon color="error" />}</TableCell>
            <TableCell component="th" scope="row" align="center">
              <NavLink
                to={{
                  pathname: `/${node.owner.login}/${node.name}`,
                }}
              >
                {node.name}
              </NavLink>
            </TableCell>
            <TableCell align="right">{node.description}</TableCell>
            <TableCell align="center">{node.owner.login}</TableCell>
            <TableCell align="right">{node.releases.nodes[node.releases.nodes.length - 1]?.name}</TableCell>
            <TableCell align="right">
              {node.repositoryTopics.nodes.reduce(
                (result, { topic: { name: topicName } }) => `${result}, ${topicName}`.replace(/^,*/, ''),
                '',
              )}
            </TableCell>
            <TableCell align="right">
              {node.languages.nodes.reduce(
                (result, { name: languageName }) => `${result}, ${languageName}`.replace(/^,*/, ''),
                '',
              )}
            </TableCell>
            <TableCell>
              <IconButton aria-label="settings">
                <MoreVertIcon onClick={handleMenuOpen(node.id)} />
              </IconButton>
            </TableCell>
          </TableRow>
        ))}
        <Menu
          anchorEl={anchorEl}
          anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
          transformOrigin={{ horizontal: 'right', vertical: 'top' }}
          open={!!anchorEl}
          onClose={handleMenuClose}
        >
          <MenuItem onClick={handleAddToFavorite(selectedRowId)}>
            {allLikedRepoIds?.includes(selectedRowId) ? 'Удалить из понравившихся' : 'Добавить в понравившиеся'}
          </MenuItem>
          <MenuItem onClick={handleAddToCollection}>Добавить в коллекцию</MenuItem>
        </Menu>
      </TableBody>
    </>
  );
};

TableBodyComponent.propTypes = {
  allLikedRepoIds: PropTypes.arrayOf(PropTypes.string).isRequired,
  anchorEl: PropTypes.string.isRequired,
  data: PropTypes.string.isRequired,
  selectedRowId: PropTypes.string.isRequired,
  setAnchorEl: PropTypes.func.isRequired,
  setOpen: PropTypes.func.isRequired,
  setSelectedRowId: PropTypes.func.isRequired,
};
