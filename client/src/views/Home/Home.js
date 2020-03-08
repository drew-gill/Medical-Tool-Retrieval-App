import React, { useState } from 'react';
import logo from '../../assets/logo.svg';
import styled from 'styled-components';

// Material UI
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import SearchRounded from '@material-ui/icons/SearchRounded';
import ToolDetailPopup from '../../components/ToolDetailPopup';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { makeStyles } from '@material-ui/core/styles';

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

const dummyData = [
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

const useStyles = makeStyles(theme => ({
  root: {
    '& > *': {
      margin: theme.spacing(25),
    },
  },
  input: {
    display: 'none'
  },
}));

function Home() {
  const [filteredTools, setFilteredTools] = useState(dummyData);
  const [selectedTool, setSelectedTool] = useState(null);
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
    dummyData.push(obj);
    setOpen(false);
  };

  const classes = useStyles();

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
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title"> 
        <DialogTitle id="form-dialog-title" >Upload A New Tool</DialogTitle >
        <DialogContent>
          <DialogContentText>
            To upload a new tool, fill in the info below. (Just click upload for demo)
          </DialogContentText>
          <div className={classes.root}>
            <input
              accept="image/*"
              className={classes.input}
              id="contained-button-file"
              type="file"
            />
            <label htmlFor="contained-button-file">
              <Button variant="contained" color="primary" component="span" >
                Upload An Image
              </Button>
            </label>
          </div>
          <TextField
            autoFocus
            margin="dense"
            id="keywords"
            label="Keywords"
            type="keywords"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={addToDummy} color="primary">
            Upload
          </Button>
        </DialogActions>
      </Dialog>

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
