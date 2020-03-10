import React, { useState, useEffect } from 'react';
import logo from '../../assets/logo.svg';
import styled from 'styled-components';

// Material UI
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import SearchRounded from '@material-ui/icons/SearchRounded';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';

// Custom components
import ToolDetailPopup from '../../components/ToolDetailPopup';
import AddToolPopup from '../../components/AddToolPopup';
import { readAllTools, deleteTool, createTool } from '../../apiCalls';

// Styled components
const RootContainer = styled.div`
  margin: 40px;
`;

const SearchBarForm = styled.form`
  margin: 10px 0px;
`;

const ToolImage = styled.img`
  width: 100%;
  padding: 10px;
  box-sizing: border-box;
  border-radius: 10px;
  &:hover {
    cursor: pointer;
    background-color: rgba(0, 0, 0, 0.05);
  }
`;

function Home() {
  const [data, setData] = useState(null);
  const [filteredTools, setFilteredTools] = useState([]);
  const [selectedTool, setSelectedTool] = useState(null);

  useEffect(() => {
    const fetch = async () => {
      const res = await readAllTools();
      setData(res);
      setFilteredTools(res);
    };
    fetch();
  }, []);

  // Used to control opening up popup of adding a tool
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const addTool = async (image, keywords) => {
    await createTool(image, keywords);
  };

  const removeTool = async id => {
    await deleteTool(id);
    const res = await readAllTools();
    setData(res);
  };

  const filterTools = e => {
    const searchTerm = e.target.value;
    const newData = [];
    data.forEach(d => {
      for (let i = 0; i < d.keywords.length; i++) {
        const word = d.keywords[i];
        if (word.search(searchTerm) !== -1) {
          newData.push(d);
          break;
        }
      }
    });
    setFilteredTools(newData);
  };

  return (
    <RootContainer>
      <SearchBarForm noValidate>
        <TextField
          onChange={filterTools}
          label='Search'
          placeholder='Type to search...'
          type='search'
          autoCorrect='off'
          autoCapitalize='off'
          autoComplete='off'
          spellCheck='false'
          id='search'
          fullWidth
          InputProps={{
            startAdornment: (
              <InputAdornment position='start'>
                <SearchRounded />
              </InputAdornment>
            )
          }}
        />
      </SearchBarForm>

      <Button variant='contained' color='primary' onClick={handleClickOpen}>
        Upload A New Tool
      </Button>

      <AddToolPopup
        open={open}
        handleClose={handleClose}
        createFunction={image =>
          addTool(image, ['demo-keyword', 'for-demo-purposes-only'])
        }
      />

      {data !== null ? (
        <Grid container>
          {filteredTools.map((d, index) => (
            <Grid item xs={4} key={index}>
              <ToolImage
                onClick={() => setSelectedTool(d)}
                src={`data:image/jpg;base64, ${d.image.toString('base64')}`}
              />
            </Grid>
          ))}
        </Grid>
      ) : (
        <div>
          <CircularProgress />
        </div>
      )}

      <ToolDetailPopup
        tool={selectedTool}
        isOpen={selectedTool !== null}
        close={() => setSelectedTool(null)}
        deleteFunction={removeTool}
      />
    </RootContainer>
  );
}

export default Home;
