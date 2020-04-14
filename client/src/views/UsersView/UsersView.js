import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';

// Custom
import { AuthContext } from '../../Auth';

// Material UI
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import IconButton from '@material-ui/core/IconButton';
import ArrowBackRoundedIcon from '@material-ui/icons/ArrowBackRounded';

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

const UsersView = () => {
  const authContext = useContext(AuthContext);
  const history = useHistory();

  const goBack = () => history.goBack();

  return (
    <RootContainer>
      <BackButtonContainer>
        <IconButton onClick={goBack}>
          <ArrowBackRoundedIcon />
        </IconButton>
      </BackButtonContainer>

      <Container maxWidth='md'>
        <ViewContainer>
          <Typography variant='h6'>Users</Typography>
        </ViewContainer>
      </Container>
    </RootContainer>
  );
};

export default UsersView;
