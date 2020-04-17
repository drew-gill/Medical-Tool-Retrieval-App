import React, { useState, useEffect } from 'react';

// Material UI
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const ConfirmDialog = ({
  title,
  description,
  open,
  closeFunction,
  confirmFunction,
}) => {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(false);
  }, [open]);

  const handleClose = () => closeFunction();
  const handleConfirm = async () => {
    setLoading(true);
    try {
      await confirmFunction();
    } catch (error) {
      console.log(error.message);
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{description}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color='primary'>
          Cancel
        </Button>
        {loading ? (
          <CircularProgress />
        ) : (
          <Button onClick={handleConfirm} color='primary' autoFocus>
            Confirm
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmDialog;
