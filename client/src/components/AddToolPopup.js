import React, { useState } from 'react';

// Material UI
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import TextField from '@material-ui/core/TextField';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    '& > *': {
      margin: theme.spacing(25)
    }
  },
  input: {
    display: 'none'
  }
}));

const AddToolPopup = ({ open, handleClose, createFunction }) => {
  const classes = useStyles();
  const [img, setImg] = useState(null);

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Upload A New Tool</DialogTitle>
      <DialogContent>
        <DialogContentText>
          To upload a new tool, fill in the info below. (Just click upload for
          demo)
        </DialogContentText>
        <div className={classes.root}>
          <input
            accept='image/*'
            className={classes.input}
            id='image-upload-input'
            type='file'
            onChange={e => {
              setImg(e.target.files[0]);
            }}
          />
          <label htmlFor='image-upload-input'>
            <Button variant='contained' color='primary' component='span'>
              Upload An Image
            </Button>
          </label>
        </div>
        <TextField
          autoFocus
          margin='dense'
          id='keywords'
          label='Keywords'
          type='keywords'
          fullWidth
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color='primary'>
          Cancel
        </Button>
        <Button onClick={() => createFunction(img)} color='primary'>
          Create
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddToolPopup;
