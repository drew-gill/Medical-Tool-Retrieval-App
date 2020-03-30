import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';

// Custom components
import { AuthContext } from '../../Auth';

// Material UI
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

const LoginContainer = styled.div`
  width: 300px;
  height: 300px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
`;

const ButtonContainer = styled.div`
  padding-top: 10px;
  text-align: center;
`;

const useStyles = makeStyles(theme => ({
  root: {
    '& > *': {
      margin: theme.spacing(1)
    }
  }
}));

const Login = () => {
  const classes = useStyles();
  const authContext = useContext(AuthContext);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const validateForm = () => {
    return username.length > 0 && password.length > 0;
  };

  const handleSubmit = async event => {
    event.preventDefault();
    await authContext.login(username, password);
  };

  const history = useHistory();
  const handleRedirect = () => {
    history.push('/Home');
  };

  return (
    <LoginContainer>
      LOGIN
      <form
        className={classes.root}
        noValidate
        autoComplete='off'
        onSubmit={handleSubmit}
      >
        <TextField
          id='username'
          label='Username'
          value={username}
          autoFocus
          onChange={e => setUsername(e.target.value)}
        />
        <TextField
          id='password'
          label='Password'
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <ButtonContainer>
          <Button
            disabled={!validateForm()}
            variant='contained'
            color='primary'
            type='submit'
          >
            Sign In
          </Button>
          <br></br>
          <ButtonContainer>or</ButtonContainer>
          <br></br>
          <Button onClick={handleRedirect} variant='contained' color='primary'>
            Continue
          </Button>
        </ButtonContainer>
      </form>
    </LoginContainer>
  );
};

export default Login;
