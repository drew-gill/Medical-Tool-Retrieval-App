import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

// Material UI
import CircularProgress from '@material-ui/core/CircularProgress';

// Custom components
import ToolDetailPopup from '../../components/ToolDetailPopup';
import FilterAndViewComponent from '../../components/FilterAndViewComponent';
import AddToolComponent from '../../components/AddToolComponent';
import { readAllTools, deleteTool, createTool } from '../../apiCalls';

// Styled components
const RootContainer = styled.div`
  margin: 40px;
`;

const LoadingContainer = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Home = () => {
  const [data, setData] = useState([]);
  const [selectedTool, setSelectedTool] = useState(null);

  useEffect(() => {
    const fetch = async () => {
      const res = await readAllTools();
      setData(res);
    };
    fetch();
  }, []);

  const addTool = async (image, keywords) => {
    const newTool = await createTool(image, keywords);
    setData([...data, newTool]);
  };

  const removeTool = async id => {
    await deleteTool(id);
    const newData = [];
    data.forEach(d => {
      if (d._id !== id) {
        newData.push(d);
      }
    });
    setData(newData);
  };

  const selectTool = item => {
    setSelectedTool(item);
  };

  // if (data === null) {
  //   return (
  //     <LoadingContainer>
  //       <CircularProgress />
  //     </LoadingContainer>
  //   );
  // }

  return (
    <RootContainer>
      <FilterAndViewComponent data={data} selectFunction={selectTool} />

      <AddToolComponent createFunction={addTool} />

      <ToolDetailPopup
        tool={selectedTool}
        isOpen={selectedTool !== null}
        close={() => setSelectedTool(null)}
        deleteFunction={removeTool}
      />
    </RootContainer>
  );
};

export default Home;
