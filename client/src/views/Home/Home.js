import React, { useState } from 'react';
import logo from '../../assets/logo.svg';
import './Home.css';
import styled from 'styled-components';

// Material UI
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import SearchRounded from '@material-ui/icons/SearchRounded';
import ToolDetailPopup from '../../components/ToolDetailPopup';

// Styled components
const RootContainer = styled.div`
  margin: 40px;
`;

const ToolImage = styled.img`
  width: auto;
  &:hover {
    cursor: pointer;
  }
`;

const dummyData = [
  {
    src: logo,
    keywords: ['one', '1']
  },
  {
    src: logo,
    keywords: ['two', '2']
  },
  {
    src: logo,
    keywords: ['three', '3']
  }
];

function Home() {
  const [filteredTools, setFilteredTools] = useState(dummyData);
  const [selectedTool, setSelectedTool] = useState(null);

  const filterTools = e => {
    const searchTerm = e.target.value;
    const newData = [];
    dummyData.forEach(d => {
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
      <form noValidate>
        <TextField
          onChange={filterTools}
          label='Search'
          placeholder='Type to search...'
          type='search'
          autoCorrect='off'
          autoCapitalize='off'
          autoComplete='off'
          spellCheck='false'
          fullWidth
          InputProps={{
            startAdornment: (
              <InputAdornment position='start'>
                <SearchRounded />
              </InputAdornment>
            )
          }}
        />
      </form>
      <Grid container>
        {filteredTools.map((d, index) => (
          <Grid item xs={4} key={index}>
            <ToolImage onClick={() => setSelectedTool(d)} src={d.src} />
          </Grid>
        ))}
      </Grid>
      <ToolDetailPopup
        tool={selectedTool}
        isOpen={selectedTool !== null}
        close={() => setSelectedTool(null)}
      />
    </RootContainer>
  );
}

export default Home;
