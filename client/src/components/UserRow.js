import React, { useState } from 'react';

// Material UI
import IconButton from '@material-ui/core/IconButton';
import DeleteRoundedIcon from '@material-ui/icons/DeleteRounded';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import CircularProgress from '@material-ui/core/CircularProgress';

const UserRow = ({ user, deleteUser }) => {
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    setLoading(true);
    try {
      await deleteUser(user);
    } catch (error) {
      console.log(error.message);
      setLoading(false);
    }
  };

  return (
    <TableRow>
      <TableCell component='th' scope='row'>
        {user.username}
      </TableCell>
      <TableCell>{user._id}</TableCell>
      <TableCell align='right'>
        {loading ? (
          <CircularProgress />
        ) : (
          <IconButton color='secondary' onClick={handleDelete}>
            <DeleteRoundedIcon />
          </IconButton>
        )}
      </TableCell>
    </TableRow>
  );
};

export default UserRow;
