import React, { useState } from 'react';
import styled from 'styled-components';

// Material UI
import { makeStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import TextField from '@material-ui/core/TextField';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Chip from '@material-ui/core/Chip';
import CircularProgress from '@material-ui/core/CircularProgress';

// Styled components
const UploadContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  flex-direction: column;
`;

const UploadedImage = styled.img`
  width: 100%;
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

const LoadingContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

// Styles
const useStyles = makeStyles(theme => ({
  button: {
    position: 'fixed',
    right: 20,
    bottom: 20
  },
  input: {
    display: 'none'
  },
  chip: {
    margin: 5
  }
}));

const AddToolComponent = ({ createFunction }) => {
  const classes = useStyles();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [open, setOpen] = useState(false);
  const [imgData, setImgData] = useState(null);
  const [img, setImg] = useState(null);
  const [keyInputValue, setKeyInputValue] = useState('');
  const [keywords, setKeywords] = useState(['demo']);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleCreate = async () => {
    setIsSubmitting(true);
    await createFunction(imgData, keywords);
    setIsSubmitting(false);
    handleClose();
  };

  const handleKeyInputChange = e => {
    setKeyInputValue(e.target.value);
  };

  return (
    <React.Fragment>
      {/* Button */}
      <Fab className={classes.button} color='primary' onClick={handleOpen}>
        <AddIcon />
      </Fab>
      {/* Popup */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add New Tool</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Upload an image for the tool and add keywords associated with the
            tool.
          </DialogContentText>
          <UploadContainer>
            {img !== null && <UploadedImage src={img} />}
            <input
              accept='image/*'
              className={classes.input}
              id='image-upload-input'
              type='file'
              onChange={e => {
                setImgData(e.target.files[0]);
                let reader = new FileReader();
                reader.onloadend = () => {
                  setImg(reader.result);
                };
                reader.readAsDataURL(e.target.files[0]);
              }}
            />
            <label htmlFor='image-upload-input'>
              <Button variant='contained' color='primary' component='span'>
                Upload An Image
              </Button>
            </label>
          </UploadContainer>
          <form
            noValidate
            autoComplete='off'
            onSubmit={e => {
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
              autoFocus
              margin='dense'
              id='keywords'
              label='Enter a keyword'
              helperText='Enter a keyword and press enter to add it to the list.'
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
                color='secondary'
              />
            ))}
          </KeywordContainer>
          {isSubmitting && (
            <LoadingContainer>
              <CircularProgress />
            </LoadingContainer>
          )}
        </DialogContent>
        {!isSubmitting && (
          <DialogActions>
            <Button onClick={handleClose} color='primary'>
              Cancel
            </Button>
            <Button onClick={handleCreate} color='primary'>
              Add
            </Button>
          </DialogActions>
        )}
      </Dialog>
    </React.Fragment>
  );
};

export default AddToolComponent;
