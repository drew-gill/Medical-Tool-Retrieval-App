import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

// Material UI
import Typography from '@material-ui/core/Typography';

// Custom components
import { withToolData } from '../../components/ToolDataContext';
import ToolDetailPopup from '../../components/ToolDetailPopup';
import FilterAndViewComponent from '../../components/FilterAndViewComponent';
import AddEditToolComponent from '../../components/AddEditToolComponent';

// Styled components
const RootContainer = styled.div`
  margin: 40px;
`;

const Home = ({ toolData }) => {
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

  return (
    <RootContainer>
      <Typography variant='h3'>Tool Finder</Typography>
      <FilterAndViewComponent data={data} selectFunction={selectTool} />

      <AddEditToolComponent actionButtonFunction={addTool} />

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
