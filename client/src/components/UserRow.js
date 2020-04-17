import React, { useState } from 'react';

// Material UI
import IconButton from '@material-ui/core/IconButton';
import DeleteRoundedIcon from '@material-ui/icons/DeleteRounded';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';

const UserRow = ({ user, deleteFunction }) => {
  const handleDelete = () => deleteFunction(user);

  return (
    <TableRow>
      <TableCell component='th' scope='row'>
        {user.username}
      </TableCell>
      <TableCell>{user._id}</TableCell>
      <TableCell align='right'>
        <IconButton color='secondary' onClick={handleDelete}>
          <DeleteRoundedIcon />
        </IconButton>
      </TableCell>
    </TableRow>
  );
};

export default UserRow;
