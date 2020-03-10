import React, { useState } from 'react';
import logo from '../../assets/logo.svg';
import styled from 'styled-components';

// Material UI
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import SearchRounded from '@material-ui/icons/SearchRounded';
import ToolDetailPopup from '../../components/ToolDetailPopup';
import AddToolPopup from '../../components/AddToolPopup';
import Button from '@material-ui/core/Button';

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

let dummyData = [
  {
    src: logo,
    keywords: [
      'one',
      '1',
      '3',
      '4',
      '5',
      '6',
      '7',
      '8',
      'sdafgsadf',
      'asdfasf',
      'asdfasdfsdaf',
      'asdfasf'
    ]
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

  // Used to control opening up popup of adding a tool
  const [open,setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  }
  const handleClose = () => {
    setOpen(false);
  };
  const addToDummy = () => {
    let obj = {};
    obj['src'] = logo;
    obj['keywords'] = ['testing if this works', 'abc'];
    //for (let i = 0; i < 2000; i++) {
      dummyData.push(obj);
    //}
    setOpen(false);
  };
  // End of control add tool (will come back to clean this area too, AddToolPopup component is now working)

  // Delete a tool (in the future use mongoose ID)
  const deleteFromDummy = (data) => {
    //console.log("inside of delete from dummy!!!");
    //console.log("the data is: ", {data});
    const filterItems = dummyData.filter(function(item) {
      //console.log(item);
      return item !== data;
    });
    //console.log(filterItems);
    dummyData = filterItems;
    setFilteredTools(dummyData);
    // Small hack to clear search field, in textfield "id='search'"
    document.getElementById('search').value = ''
  };
  // End of delete

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

      <Button variant="contained" color="primary" onClick={handleClickOpen}>
        Upload A New Tool
      </Button>
      <AddToolPopup
        open={open}
        handleClose={handleClose}
        addToDummy={addToDummy}
      />
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
        deleteFromDummy={deleteFromDummy}
      />
    </RootContainer>
  );
}

export default Home;
