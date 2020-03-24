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

const useStyles = makeStyles(theme => ({
    root: {
      '& > *': {
        margin: theme.spacing(1),
      },
    },
}));

const Login = (props) => {
    const classes = useStyles();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    function validateForm() {
        return username.length > 0 && password.length > 0;
    }

    function handleSubmit(event) {
        event.preventDefault();
    }

    const history = useHistory();
    const handleRedirect = () => {
        history.push("/Home");
    }

    return (
      <LoginContainer>
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
            <Button disabled={!validateForm()} color='primary'>
              Sign In
            </Button>
            <br></br>
            <Button onClick={handleRedirect} color='primary'>
              Continue
            </Button>
          </form>
      </LoginContainer>
    );
};

export default Login;