import React from 'react';
import styled from 'styled-components';

// Material UI
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Backdrop from '@material-ui/core/Backdrop';
import Paper from '@material-ui/core/Paper';
import Chip from '@material-ui/core/Chip';
import IconButton from '@material-ui/core/IconButton';
import CloseRounded from '@material-ui/icons/CloseRounded';

// Delete Button from Material UI
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';

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
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ToolImage = styled.img`
  width: 100%;
  max-width: 80vh;
  display: relative;
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

  // Helper function to delete the tool and then close the popup
  const deleteTool = () => {
    deleteFunction(tool._id);
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
        <Button
          variant='contained'
          color='default'
          startIcon={<DeleteIcon />}
          onClick={() => deleteTool()}
        >
          Delete
        </Button>
      </RootContainer>
    </Backdrop>
  );
};

export default ToolDetailPopup;
