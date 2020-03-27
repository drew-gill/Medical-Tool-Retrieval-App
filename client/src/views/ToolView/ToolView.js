import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

// Material UI
import Typography from '@material-ui/core/Typography';

// Styled components
const RootContainer = styled.div`
  margin: 40px;
`;

const ToolView = () => {
  return (
    <RootContainer>
      <Typography>ToolView</Typography>
      <Link to='/Home'>Back</Link>
    </RootContainer>
  );
};

export default ToolView;
