import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';

// Custom components
import { AuthContext } from '../../Auth';

// Material UI
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import Typography from '@material-ui/core/Typography';

const LoginContainer = styled.div`
  width: 300px;
  height: 450px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
`;

const ButtonContainer = styled.div`
  padding-top: 2px;
  padding-bottom: 2px;
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
  const history = useHistory();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [retryUsername, setRetryUsername] = useState(false);
  const [retryPassword, setRetryPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const validateForm = () => {
    return username.length > 0 && password.length > 0;
  };
  
  const handleSubmit = async event => {
    event.preventDefault();
    await authContext.login(username, password);
    if (history.location.pathname !== '/Login') {
      console.log("successfuly logged in");
    }
    else {
      setRetryUsername(true);
      setRetryPassword(true);
    }
  };

  const handleRedirect = () => {
    history.push('/Home');
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <LoginContainer>
      <Typography variant='h2' gutterBottom={true}>Login</Typography>
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
          onChange={(e) => {
            setUsername(e.target.value);
            setRetryUsername(false);
            }
          }
          error={retryUsername}
          helperText={retryUsername ? 'Possible Invalid Username!': ' '}
          fullWidth
        />
        <TextField
          id='password'
          type={showPassword ? "text" : "password"}
          label='Password'
          value={password}
          onChange={(e) => {
            setPassword(e.target.value)
            setRetryPassword(false);
            }
          }
          error={retryPassword}
          helperText={retryPassword ? 'Possible Invalid Password!' : ' '}
          fullWidth
          InputProps={{
            endAdornment:
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
              >
                {showPassword ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
          }}
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
        </ButtonContainer>
        <ButtonContainer>
          <Typography 
            ariant='body1'
          >
            or
          </Typography>
        </ButtonContainer>
        <ButtonContainer>
          <Button 
            onClick={handleRedirect} 
            variant='contained' 
            color='primary'
          >
            Continue
          </Button>
        </ButtonContainer>
      </form>
    </LoginContainer>
  );
};

export default Login;