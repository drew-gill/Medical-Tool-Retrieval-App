import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

// Material UI
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import TextField from '@material-ui/core/TextField';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import CircularProgress from '@material-ui/core/CircularProgress';

// Styled components

const AddUserPopup = ({ handleClose, open, action }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleUsername = (e) => {
    setUsername(e.target.value);
  };
  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleAction = async () => {
    setIsSubmitting(true);
    action(username, password);
    setIsSubmitting(false);
    setUsername('');
    setPassword('');
    handleClose();
  };

  return (
    <Dialog open={open} maxWidth='sm' fullWidth>
      <DialogTitle>New User</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Enter an unique username and a password for the new user.
        </DialogContentText>
        <TextField
          variant='filled'
          margin='dense'
          id='username'
          label='Username'
          type='text'
          fullWidth
          value={username}
          onChange={handleUsername}
        />
        <TextField
          variant='filled'
          margin='dense'
          id='password'
          label='Password'
          type='password'
          fullWidth
          value={password}
          onChange={handlePassword}
        />
      </DialogContent>
      <DialogActions>
        {isSubmitting ? (
          <CircularProgress />
        ) : (
          <React.Fragment>
            <Button onClick={handleClose} color='primary'>
              Cancel
            </Button>
            <Button onClick={handleAction} color='primary'>
              Create
            </Button>
          </React.Fragment>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default AddUserPopup;
