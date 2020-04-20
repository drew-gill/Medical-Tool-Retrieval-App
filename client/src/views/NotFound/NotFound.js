import React from 'react';
import styled from 'styled-components';
import { Link, useHistory } from 'react-router-dom';

// Material UI
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

// Styled components
const RootContainer = styled.div`
  padding: 40px 0;
`;

const ContentContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const NotFound = () => {
  const history = useHistory();

  const goHome = () => history.replace('/Home');

  return (
    <RootContainer>
      <Container maxWidth='sm'>
        <ContentContainer>
          <Typography
            style={{ fontWeight: 'bold', marginBottom: 10 }}
            variant='h2'
          >
            Oops.
          </Typography>
          <Typography style={{ marginBottom: 20 }}>
            This page does not exist.
          </Typography>
          <Button
            onClick={goHome}
            disableElevation
            variant='contained'
            color='primary'
          >
            Go Home
          </Button>
        </ContentContainer>
      </Container>
    </RootContainer>
  );
};

export default NotFound;
