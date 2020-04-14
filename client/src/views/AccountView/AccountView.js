import React, { useState, useEffect, useContext } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import styled from 'styled-components';

// Custom components
import { AuthContext } from '../../Auth';
import LoadingView from '../../components/LoadingView';

// Material UI
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import IconButton from '@material-ui/core/IconButton';
import ArrowBackRoundedIcon from '@material-ui/icons/ArrowBackRounded';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import CircularProgress from '@material-ui/core/CircularProgress';

// Styled components
const RootContainer = styled.div`
  padding-top: 120px;
  padding-bottom: 40px;
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

const BackButtonContainer = styled.div`
  position: fixed;
  top: 20px;
  left: 20px;
  @media only screen and (min-width: 768px) {
    top: 40px;
    left: 40px;
  }
`;

// Styles
const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));

const ToolView = () => {
  const classes = useStyles();
  const authContext = useContext(AuthContext);
  const history = useHistory();
  const [currUser, setCurrUser] = useState(undefined);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({
    username: '',
    password: '',
    confirmPassword: '',
  });
  const [submitting, setSubmitting] = useState(false);

  const loadInformation = async () => {
    const user = await authContext.getUser();
    setCurrUser(user);
    setUsername(user.username);
  };

  useEffect(() => {
    loadInformation();
  }, []);

  const goBack = () => history.goBack();
  const handleUsername = (e) => setUsername(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);
  const handleConfirmPassword = (e) => setConfirmPassword(e.target.value);

  const validate = () => {
    let _errors = { username: '', password: '', confirmPassword: '' };
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
    if (password !== confirmPassword) {
      _errors['confirmPassword'] = 'Passwords must match.';
    }
    setErrors(_errors);
    console.log(_errors);
    if (
      _errors['username'] !== '' ||
      _errors['password'] !== '' ||
      _errors['confirmPassword'] !== ''
    ) {
      return false;
    } else {
      return true;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      // Update the user
      setSubmitting(true);
      try {
        await authContext.updateCredentials(undefined, username, password);
      } catch (error) {
        setErrors({
          username: error.message,
        });
      }
      setSubmitting(false);
      setPassword('');
      setConfirmPassword('');
    }
  };

  if (currUser === undefined) {
    return <LoadingView />;
  }

  if (!authContext.authenticated || !authContext.isMaster) {
    history.replace('/Login');
  }

  return (
    <RootContainer>
      <BackButtonContainer>
        <IconButton onClick={goBack}>
          <ArrowBackRoundedIcon />
        </IconButton>
      </BackButtonContainer>

      <Container maxWidth='xs'>
        <ViewContainer>
          <Typography variant='h6'>Account</Typography>
          <form
            className={classes.root}
            noValidate
            autoComplete='off'
            onSubmit={handleSubmit}
          >
            <TextField
              variant='filled'
              margin='dense'
              id='username'
              label='Username'
              type='text'
              helperText={errors['username']}
              error={errors['username'] !== ''}
              fullWidth
              value={username}
              onChange={handleUsername}
            />
            <TextField
              variant='filled'
              margin='dense'
              id='password'
              label='New Password'
              type='password'
              helperText={errors['password']}
              error={errors['password'] !== ''}
              fullWidth
              value={password}
              onChange={handlePassword}
            />
            <TextField
              variant='filled'
              margin='dense'
              id='confirm-password'
              label='Confirm New Password'
              type='password'
              helperText={errors['confirmPassword']}
              error={errors['confirmPassword'] !== ''}
              fullWidth
              value={confirmPassword}
              onChange={handleConfirmPassword}
            />
            {submitting ? (
              <CircularProgress style={{ marginTop: 20 }} />
            ) : (
              <Button
                style={{ marginTop: 10 }}
                disableElevation
                color='primary'
                variant='contained'
                type='submit'
              >
                Save
              </Button>
            )}
          </form>
          <Button
            onClick={authContext.logout}
            style={{ marginTop: 20 }}
            color='secondary'
            disabled={submitting}
          >
            Logout
          </Button>
        </ViewContainer>
      </Container>
    </RootContainer>
  );
};

export default ToolView;
