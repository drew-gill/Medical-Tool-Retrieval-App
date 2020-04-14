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
  const [errors, setErrors] = useState({
    username: '',
    password: '',
  });

  const validate = () => {
    let _errors = { username: '', password: '' };
    if (!username) {
      _errors['username'] = 'This field is required.';
    }
    if (username.indexOf(' ') !== -1) {
      _errors['username'] = 'Username cannot contain any spaces.';
    }
    if (password.length < 8) {
      _errors['password'] = 'Password must be at least 8 characters.';
    }
    if (!password) {
      _errors['password'] = 'This field is required.';
    }
    if (password.indexOf(' ') !== -1) {
      _errors['password'] = 'Password cannot contain any spaces.';
    }
    setErrors(_errors);
    if (_errors['username'] !== '' || _errors['password'] !== '') {
      return false;
    } else {
      return true;
    }
  };

  const handleUsername = (e) => {
    setUsername(e.target.value);
  };
  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleAction = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      if (validate()) {
        await action(username, password);
        setUsername('');
        setPassword('');
        handleClose();
      }
    } catch (error) {
      setErrors({ username: error.message, password: '' });
    }

    setIsSubmitting(false);
  };

  return (
    <Dialog open={open} maxWidth='sm' fullWidth>
      <DialogTitle>New User</DialogTitle>
      <form noValidate autoComplete='off' onSubmit={handleAction}>
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
            helperText={errors['username']}
            error={errors['username'] !== ''}
            autoFocus
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
            helperText={errors['password']}
            error={errors['password'] !== ''}
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
              <Button type='submit' color='primary'>
                Create
              </Button>
            </React.Fragment>
          )}
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default AddUserPopup;
