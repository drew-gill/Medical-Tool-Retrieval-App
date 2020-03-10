import React from 'react';

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
        margin: theme.spacing(25),
      },
    },
    input: {
      display: 'none'
    },
}));

const AddToolPopup = ({open, handleClose, addToDummy}) => {
    const classes = useStyles();

    return(
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
    );
};

export default AddToolPopup;