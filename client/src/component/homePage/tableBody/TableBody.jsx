import React from 'react';
import { TableCell, TableRow, IconButton, TableBody } from '@material-ui/core';
import { NavLink } from 'react-router-dom';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import styles from './tableBody.module.css';
import { MenuComponent } from './Menu';

export const TableBodyComponent = ({ selectedRowId, anchorEl, setOpen, setAnchorEl, setSelectedRowId }) => {
  const { likedRepoIds, allRepositories } = useSelector((state) => state.repositories);
  const { token } = useSelector((state) => state);

  const handleMenuOpen = (id) => (event) => {
    setAnchorEl(event.currentTarget);
    setSelectedRowId(id);
  };

  return (
    <>
      <TableBody>
        {allRepositories?.search?.edges?.map(({ node }) => (
          <TableRow key={node.name}>
            <TableCell component="th" scope="row" align="center" className={styles.column}>
              <NavLink
                to={{
                  pathname: `/${node.owner.login}/${node.name}`,
                }}
              >
                {node.name}
              </NavLink>
            </TableCell>
            <TableCell align="right">{node.description}</TableCell>
            <TableCell align="center" className={styles.column}>
              {node.owner.login}
            </TableCell>
            <TableCell align="right">{node.releases.nodes[node.releases.nodes.length - 1]?.name}</TableCell>
            <TableCell align="right" className={styles.column}>
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
            <TableCell className={styles.column}>
              <IconButton aria-label="settings" onClick={handleMenuOpen(node.id)}>
                <MoreVertIcon />
              </IconButton>
            </TableCell>
            <TableCell>{token && likedRepoIds?.includes(node.id) && <FavoriteIcon color="error" />}</TableCell>
          </TableRow>
        ))}
        <MenuComponent selectedRowId={selectedRowId} anchorEl={anchorEl} setOpen={setOpen} setAnchorEl={setAnchorEl} />
      </TableBody>
    </>
  );
};

TableBodyComponent.propTypes = {
  anchorEl: PropTypes.string,
  selectedRowId: PropTypes.string.isRequired,
  setAnchorEl: PropTypes.func.isRequired,
  setOpen: PropTypes.func.isRequired,
  setSelectedRowId: PropTypes.func.isRequired,
};
TableBodyComponent.defaultProps = {
  anchorEl: null,
};
