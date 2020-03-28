import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';

// Material UI
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

// Custom components
import { withToolData } from '../../components/ToolDataContext';
import { AuthContext } from '../../Auth';
import ToolDetailPopup from '../../components/ToolDetailPopup';
import FilterAndViewComponent from '../../components/FilterAndViewComponent';
import AddEditToolComponent from '../../components/AddEditToolComponent';

// Styled components
const RootContainer = styled.div`
  margin: 40px;
`;

const TopBar = styled.div`
  display: flex;
  width: 100%;
`;

const ActionContainer = styled.div`
  display: flex;
  flex: 1;
  justify-content: flex-end;
`;

const Home = ({ toolData }) => {
  const authContext = useContext(AuthContext);
  const history = useHistory();
  const [data, setData] = useState(toolData.data);
  const [selectedTool, setSelectedTool] = useState(null);

  useEffect(() => {
    const fetch = async () => {
      await toolData.fetchAllTools();
      setData(toolData.data);
    };
    if (data.length === 0) {
      fetch();
    }
    authContext.refreshAuth();
  }, []);

  const addTool = async (image, keywords) => {
    await toolData.createTool(image, keywords);
    setData(toolData.data);
  };

  const removeTool = async id => {
    await toolData.deleteTool(id);
    setData(toolData.data);
  };

  const selectTool = item => {
    setSelectedTool(item);
  };

  const pushLogin = () => history.push('/Login');

  return (
    <RootContainer>
      <TopBar>
        <Typography variant='h3'>Tool Finder</Typography>
        <ActionContainer>
          <Button
            color={authContext.authenticated ? 'secondary' : 'primary'}
            onClick={authContext.authenticated ? authContext.logout : pushLogin}
          >
            {authContext.authenticated ? 'Logout' : 'Login'}
          </Button>
        </ActionContainer>
      </TopBar>
      <FilterAndViewComponent data={data} selectFunction={selectTool} />

      {authContext.authenticated && (
        <AddEditToolComponent actionButtonFunction={addTool} />
      )}

      <ToolDetailPopup
        tool={selectedTool}
        isOpen={selectedTool !== null}
        close={() => setSelectedTool(null)}
        deleteFunction={removeTool}
      />
    </RootContainer>
  );
};

export default withToolData(Home);
