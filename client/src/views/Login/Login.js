import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';

// Custom components
import { AuthContext } from '../../Auth';

// Material UI
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';

const RootContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ViewContainer = styled.div`
  width: 100%;
  padding: 20px;
  box-sizing: border-box;
  border-radius: 5px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  flex-direction: column;
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
  const [errors, setErrors] = useState(undefined);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = () => {
    return username.length > 0 && password.length > 0;
  };

  const handleSubmit = async event => {
    event.preventDefault();
    setIsLoading(true);
    try {
      await authContext.login(username, password);
    } catch (error) {
      setErrors(error.message);
      setIsLoading(false);
    }
  };

  const handleRedirect = () => {
    history.push('/Home');
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <RootContainer>
      <Container maxWidth='xs'>
        <ViewContainer>
          <Typography variant='h5' gutterBottom={true}>
            Login
          </Typography>
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
              variant='filled'
              margin='dense'
              autoFocus
              onChange={e => {
                setUsername(e.target.value);
              }}
              error={errors !== undefined}
              helperText={errors}
              fullWidth
            />
            <TextField
              id='password'
              type={showPassword ? 'text' : 'password'}
              label='Password'
              value={password}
              variant='filled'
              margin='dense'
              onChange={e => {
                setPassword(e.target.value);
              }}
              error={errors !== undefined}
              helperText={errors}
              fullWidth
              InputProps={{
                endAdornment: (
                  <InputAdornment position='end'>
                    <IconButton
                      aria-label='toggle password visibility'
                      onClick={handleClickShowPassword}
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                )
              }}
            />
            {isLoading ? (
              <CircularProgress />
            ) : (
              <Button
                disabled={!validateForm()}
                variant='contained'
                disableElevation
                disableRipple
                color='primary'
                type='submit'
              >
                Sign In
              </Button>
            )}

            <Divider style={{ margin: '30px 0px' }} variant='middle' />
            <Typography variant='body2'>
              Use the button below to continue without administrative access.
            </Typography>
            <Button
              onClick={handleRedirect}
              variant='contained'
              color='primary'
              disableElevation
              disableRipple
            >
              Continue
            </Button>
          </form>
        </ViewContainer>
      </Container>
    </RootContainer>
  );
};

export default Login;
