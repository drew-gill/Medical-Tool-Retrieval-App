import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';

// Material UI
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import ReplayRoundedIcon from '@material-ui/icons/ReplayRounded';

// Custom components
import { withToolData } from '../../components/ToolDataContext';
import { AuthContext } from '../../Auth';
import AccountMenu from '../../components/AccountMenu';
import ToolDetailPopup from '../../components/ToolDetailPopup';
import FilterAndViewComponent from '../../components/FilterAndViewComponent';
import AddEditToolComponent from '../../components/AddEditToolComponent';


// Styled components
const RootContainer = styled.div`
  padding: 40px 0;
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

  const fetchTools = async () => {
    await toolData.fetchAllTools();
    setData(toolData.data);
  };

  useEffect(() => {
    if (data.length === 0) {
      fetchTools();
    }
    authContext.refreshAuth();
  }, []);

  const addTool = async (image, keywords) => {
    await toolData.createTool(image, keywords);
    setData(toolData.data);
  };

  const removeTool = async (id) => {
    await toolData.deleteTool(id);
    setData(toolData.data);
  };

  const selectTool = (item) => {
    setSelectedTool(item);
  };

  const pushLogin = () => history.push('/Login');

  const handleRefresh = async () => {
    setData([]);
    await fetchTools();
  };

  return (
    <RootContainer>
      <TopBar>
        <Typography variant='h4'>Tool Finder</Typography>
        <ActionContainer>
          <Button
            color='primary'
            style={{ marginRight: 5 }}
            disabled={data.length === 0}
            onClick={handleRefresh}
            endIcon={<ReplayRoundedIcon />}
            disableElevation
          >
            Refresh
          </Button>
          {authContext.authenticated ? (
            <AccountMenu logout={authContext.logout} />
          ) : (
            <Button color='primary' onClick={pushLogin} disableElevation>
              Login
            </Button>
          )}
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
