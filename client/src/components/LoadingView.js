import React from 'react';
import styled from 'styled-components';

import CircularProgress from '@material-ui/core/CircularProgress';

const RootContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
`;

const LoadingView = () => (
  <RootContainer>
    <CircularProgress />
  </RootContainer>
);

export default LoadingView;
