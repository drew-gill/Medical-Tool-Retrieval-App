// This file was replaced with the ToolView page

import React, { useState } from 'react';
import styled from 'styled-components';

// Material UI
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Backdrop from '@material-ui/core/Backdrop';
import Paper from '@material-ui/core/Paper';
import Chip from '@material-ui/core/Chip';
import IconButton from '@material-ui/core/IconButton';
import CloseRounded from '@material-ui/icons/CloseRounded';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import CircularProgress from '@material-ui/core/CircularProgress';

// Styles
const useStyles = makeStyles(theme => ({
  closeButton: {
    position: 'absolute',
    left: 0
  },
  backdrop: {
    zIndex: 4,
    color: '#fff'
  },
  chip: {
    margin: 5
  }
}));

// Styled components
const RootContainer = styled(Paper)`
  width: 80vw;
  height: 80vh;
  overflow-y: auto;
  position: relative;
  margin: 40px;
`;

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  margin: 40px 0px;
`;

const ToolImage = styled.img`
  width: 80%;
  height: 70vh;
  object-fit: cover;
  display: relative;
  padding-bottom: 10px;
`;

const KeywordContainer = styled.div`
  width: 50%;
  height: auto;
  display: flex;
  justify-content: center;
  padding: 20px 0px;
  flex-wrap: wrap;
`;

const ToolDetailPopup = ({ tool, isOpen, close, deleteFunction }) => {
  const classes = useStyles();
  const [isDeleting, setIsDeleting] = useState(false);

  // Helper function to delete the tool and then close the popup
  const deleteTool = async () => {
    setIsDeleting(true);
    await deleteFunction(tool._id);
    setIsDeleting(false);
    close();
  };

  // Prevent false render
  if (tool === null) {
    return <React.Fragment></React.Fragment>;
  }

  const { image, keywords } = tool;
  const src = `data:image/jpg;base64, ${image.toString('base64')}`;

  return (
    <Backdrop open={isOpen} className={classes.backdrop}>
      <RootContainer>
        <IconButton className={classes.closeButton} onClick={close}>
          <CloseRounded />
        </IconButton>
        <Container>
          <ToolImage src={src} />
          <Typography variant='h6'>Keywords</Typography>
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
          {isDeleting ? (
            <CircularProgress />
          ) : (
            <Button
              variant='text'
              color='secondary'
              startIcon={<DeleteIcon />}
              onClick={deleteTool}
            >
              Delete
            </Button>
          )}
        </Container>
      </RootContainer>
    </Backdrop>
  );
};

export default ToolDetailPopup;
