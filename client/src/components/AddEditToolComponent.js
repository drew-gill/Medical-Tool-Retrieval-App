import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import {recordAudio, stopAudio} from "../apiCalls.js";
// Material UI
import { makeStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import AddRoundedIcon from '@material-ui/icons/AddRounded';
import EditRoundedIcon from '@material-ui/icons/EditRounded';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import TextField from '@material-ui/core/TextField';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Chip from '@material-ui/core/Chip';
import Mic from "@material-ui/icons/Mic";
import Stop from "@material-ui/icons/Stop";
import CircularProgress from '@material-ui/core/CircularProgress';
import InputLabel from '@material-ui/core/InputLabel';
import Typography from '@material-ui/core/Typography';

// Styled components
const SectionContainer = styled.section`
  width: 100%;
  padding: 20px;
  margin: 10px 0px;
  box-sizing: border-box;
  border-radius: 5px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-color: ${(props) =>
    props.error ? 'rgba(255, 0, 0, 0.5)' : 'rgba(0, 0, 0, 0.1)'};
`;

const UploadContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  flex-direction: column;
`;

const FakeUploadedImage = styled.div`
  margin: 20px;
  width: 100%;
  height: 300px;
  background-color: rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const UploadedImage = styled.img`
  width: 100%;
  height: 300px;
  object-fit: cover;
  padding: 20px;
`;

const KeywordContainer = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  justify-content: center;
  padding: 10px 0px;
  flex-wrap: wrap;
`;

// Styles
const useStyles = makeStyles((theme) => ({
  button: {
    position: 'fixed',
    right: 20,
    bottom: 20,
  },
  input: {
    display: 'none',
  },
  chip: {
    margin: 5,
  },
}));

const AddEditToolComponent = ({ actionButtonFunction, tool }) => {
  const classes = useStyles();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [open, setOpen] = useState(false);
  const [imgData, setImgData] = useState(null);
  const [img, setImg] = useState(null);
  const [keyInputValue, setKeyInputValue] = useState('');
  const [keywords, setKeywords] = useState([]);
  const [error, setError] = useState(false);
  const [recording, setRecording] = useState(false);
  const variant = tool !== null && tool !== undefined ? 'edit' : 'add';
  const title = variant === 'edit' ? 'Edit Tool' : 'New Tool';
  const buttonTitle = variant === 'edit' ? 'Save' : 'Add';
  const fabIcon = variant === 'edit' ? <EditRoundedIcon /> : <AddRoundedIcon />;

  useEffect(() => {
    if (variant === 'edit') {
      setKeywords(tool.keywords);
      setImg(`data:image/jpg;base64, ${tool.image.toString('base64')}`);
    }
  }, [tool]);

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    if(recording){
      //Make sure recording is stopped before exit
      handleStop();
    }
    setOpen(false);
    
    if (variant === 'edit') {
      setKeywords(tool.keywords);
      setImg(`data:image/jpg;base64, ${tool.image.toString('base64')}`);
      setImgData(null);
    }
  };

  const handleAction = async () => {
    if (img !== null && keywords.length > 0) {
      setIsSubmitting(true);
      await actionButtonFunction(imgData, keywords);
      setIsSubmitting(false);
      // Reset data
      setError(false);
      setKeyInputValue('');
      setImgData(null);
      if (variant !== 'edit') {
        setKeywords([]);
        setImg(null);
        setOpen(false);
      } else {
        setOpen(false);
      }
    } else {
      setError(true);
    }
  };

  const handleKeyInputChange = (e) => {
    setKeyInputValue(e.target.value);
  };

  const handleDeleteKeyword = (keyword) => {
    const newKeywords = [];
    keywords.forEach((k) => {
      if (k !== keyword) {
        newKeywords.push(k);
      }
    });
    setKeywords(newKeywords);
  };
  const handleAudio = async () => {
  
    const key = await recordAudio();
    const data = key.split(" ");

    const newKeywords = [...keywords,...data];
    setKeywords(newKeywords);
    
   
};
const handleStop = async() =>{
  await stopAudio();
  setRecording(false);
}

  return (
    <React.Fragment>
      {/* Button */}
      <Fab className={classes.button} color='primary' onClick={handleOpen}>
        {fabIcon}
      </Fab>
      {/* Popup */}
      <Dialog open={open} maxWidth='sm' fullWidth>
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Upload an image for the tool and add keywords to associate with the
            tool.
          </DialogContentText>
          <SectionContainer error={error && img === null}>
            <InputLabel required error={error && img === null}>
              Image
            </InputLabel>
            <UploadContainer>
              {img !== null ? (
                <UploadedImage src={img} />
              ) : (
                <FakeUploadedImage>
                  <Typography>No image selected.</Typography>
                </FakeUploadedImage>
              )}
              <input
                accept='image/*'
                className={classes.input}
                id='image-upload-input'
                type='file'
                onChange={(e) => {
                  setImgData(e.target.files[0]);
                  let reader = new FileReader();
                  reader.onloadend = () => {
                    setImg(reader.result);
                  };
                  reader.readAsDataURL(e.target.files[0]);
                }}
              />
              <label htmlFor='image-upload-input'>
                <Button
                  variant='contained'
                  color='primary'
                  component='span'
                  disableRipple
                  disableElevation
                >
                  Upload An Image
                </Button>
                
              </label>
            </UploadContainer>
          </SectionContainer>
          <SectionContainer error={error && keywords.length === 0}>
          
            <InputLabel required error={error && keywords.length === 0}>
              Keywords
            </InputLabel>
            {recording == 0 &&
            <Button 
           variant='text'
           color='primary'
           endIcon = {<Mic/>}
            onClick={()=>{
              setRecording(true);
              handleAudio();
            }}>Record</Button>}
            {recording == 1 &&
            <Button
            color = 'secondary'
            endIcon = {<Stop/>}
            onClick = {() => {handleStop();}}
            >
                Stop
            </Button>

            }
            <form
              style={{ marginTop: 10 }}
              noValidate
              autoComplete='off'
              onSubmit={(e) => {
                e.preventDefault();
                if (keyInputValue) {
                  const newKeywords = keywords;
                  newKeywords.push(keyInputValue);
                  setKeywords(newKeywords);
                  setKeyInputValue('');
                }
              }}
            >
              <TextField
                variant='filled'
                margin='dense'
                id='keywords'
                label='Keyword'
                helperText='Type a keyword and press enter to add it to the list. To record keywords through audio, click the "Record" button and begin speaking.'
                type='text'
                fullWidth
                value={keyInputValue}
                onChange={handleKeyInputChange}
              />
            </form>
            <KeywordContainer>
              {keywords.map((word, index) => (
                <Chip
                  key={index}
                  label={word}
                  className={classes.chip}
                  color='primary'
                  onDelete={() => handleDeleteKeyword(word)}
                />
              ))
              }
              
                
            </KeywordContainer>
          </SectionContainer>
        </DialogContent>
        <DialogActions>
          {isSubmitting ? (
            <CircularProgress />
          ) : (
            <React.Fragment>
          
              <Button onClick={handleClose} color='primary'>
                Cancel
              </Button>
              <Button onClick={handleAction} color='primary'>
                {buttonTitle}
              </Button>
            </React.Fragment>
          )}
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};

export default AddEditToolComponent;
