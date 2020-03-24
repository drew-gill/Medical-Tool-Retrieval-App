import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import styled from 'styled-components';

// Material UI
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { FormLabel } from '@material-ui/core';
import Input from '@material-ui/core/Input';

const LoginContainer = styled.div`
  width: 300px;
  height: 300px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
`;

const ButtonContainer = styled.div`
  padding-top: 10px;
  text-align: center
`;

const useStyles = makeStyles(theme => ({
    root: {
      '& > *': {
        margin: theme.spacing(1),
      },
    },
}));

const Login = () => {
    const classes = useStyles();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const validateForm = () => {
        return username.length > 0 && password.length > 0;
    }

    const handleSubmit = (event) => {
        event.preventDefault();
    }

    const history = useHistory();
    const handleRedirect = () => {
        history.push("/Home");
    }

    return (
      <LoginContainer>
          <ButtonContainer>LOGIN</ButtonContainer>   
          <form onSubmit={handleSubmit}>
            <form className={classes.root} noValidate autoComplete="off">
              <FormLabel>Username</FormLabel>
                <Input
                  autoFocus
                  value={username}
                  type="username"
                  onChange={e => setUsername(e.target.value)}
                />
            </form>
            <form className={classes.root} noValidate autoComplete="off">
              <FormLabel>Password</FormLabel>  
                <Input
                  value={password}
                  type="password"
                  onChange={e => setPassword(e.target.value)}
                />
            </form>
            <ButtonContainer>
              <Button disabled={!validateForm()} variant="contained" color='primary'>
                Sign In
              </Button>
              <br></br>
              <ButtonContainer>or</ButtonContainer>
              <br></br>
              <Button onClick={handleRedirect} variant="contained" color='primary'>
                Continue
              </Button>
            </ButtonContainer>
          </form>
      </LoginContainer>
    );
};

export default Login;