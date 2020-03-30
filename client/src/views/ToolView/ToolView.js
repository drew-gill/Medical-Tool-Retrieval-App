import React, { useState, useEffect, useContext } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import styled from 'styled-components';

// Custom components
import { AuthContext } from '../../Auth';
import { withToolData } from '../../components/ToolDataContext';
import AddEditToolComponent from '../../components/AddEditToolComponent';
import { addToolRetrieval, readTool } from '../../apiCalls';

// Material UI
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Chip from '@material-ui/core/Chip';
import IconButton from '@material-ui/core/IconButton';
import ArrowBackRoundedIcon from '@material-ui/icons/ArrowBackRounded';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';
import DeleteRoundedIcon from '@material-ui/icons/DeleteRounded';
import Skeleton from '@material-ui/lab/Skeleton';

// Styled components
const RootContainer = styled.div`
  margin: 20px;
  margin-top: 120px;
`;

const ToolViewContainer = styled.div`
  width: 100%;
  padding: 20px;
  box-sizing: border-box;
  border-radius: 5px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const ToolImage = styled.img`
  width: 100%;
  object-fit: cover;
`;

const KeywordContainer = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  justify-content: center;
  margin: 20px 0px;
  flex-wrap: wrap;
`;

const BackButtonContainer = styled.div`
  position: fixed;
  top: 40px;
  left: 40px;
`;

const ToolView = ({ toolData }) => {
  const authContext = useContext(AuthContext);
  const [tool, setTool] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const history = useHistory();
  const { id } = useParams();
  const [isTiming, setIsTiming] = useState(false);
  let [timePassed, setTimePassed] = useState(60);
  let [startTime, setStartTime] = useState(60);

  useEffect(() => {
    const fetch = async () => {
      if (id !== null) {
        const res = await toolData.fetchTool(id);
        setTool(res);
      }
    };
    fetch();
    authContext.refreshAuth();
  }, []);

  useEffect(() => {
    if (isTiming) {
      setInterval(function() {
        let currentTime = new Date();
        let seconds = currentTime.getSeconds() - startTime.getSeconds();
        let minutes = currentTime.getMinutes() - startTime.getMinutes();

        //if(minutes * 60 + seconds !=  timePassed)
          setTimePassed(minutes * 60 + seconds);
      }, 1000);
    }
  }, [timePassed]);

  const goBack = () => history.goBack();

  const deleteTool = async () => {
    setIsDeleting(true);
    await toolData.deleteTool(id);
    setIsDeleting(false);
    goBack();
  };

  const updateTool = async (image, keywords) => {
    const res = await toolData.updateTool(image, keywords, id);
    setTool(res);
  };

  const addRetrievalListing = async (time, date, id) => {
    await addToolRetrieval(timePassed, new Date(Date.now()), id);
  };

  const toggleTimer = () => {
    if (!isTiming) {
      setIsTiming(true);
      setTimePassed(0);
      setStartTime(new Date());
    } else {
      console.log(timePassed);

      let doc = readTool(id);
      console.log(tool);
      console.log(tool.retrievalHistory.length);

      addRetrievalListing(timePassed, new Date(Date.now(), id));
      setIsTiming(false);

      doc = readTool(id);
      console.log(tool);
      console.log(tool.retrievalHistory.length);
    }
  };

  const renderImage = () => {
    if (tool === null) {
      return (
        <Skeleton
          variant='rect'
          width='100%'
          height={500}
          style={{ marginBottom: 20 }}
        />
      );
    } else {
      const src = `data:image/jpg;base64, ${tool.image.toString('base64')}`;
      return <ToolImage src={src} style={{ marginBottom: 20 }} />;
    }
  };

  const renderKeywords = () => {
    let comp = <React.Fragment />;
    if (tool === null) {
      comp = <Skeleton variant='rect' width='100%' height={100} />;
    } else {
      comp = tool.keywords.map((word, index) => (
        <Chip key={index} label={word} style={{ margin: 5 }} color='primary' />
      ));
    }
    return <KeywordContainer>{comp}</KeywordContainer>;
  };

  const renderDeleteButton = () => {
    if (isDeleting) {
      return <CircularProgress />;
    } else {
      return (
        <Button
          variant='text'
          color='secondary'
          endIcon={<DeleteRoundedIcon />}
          onClick={deleteTool}
        >
          Delete
        </Button>
      );
    }
  };
  const renderTimer = () => {
    if (isTiming) {
      return (
        <div variant='text' color='primary'>
          {Math.floor(timePassed / 60)} m : {timePassed % 60} s
        </div>
      );
    } else return;
  };

  const renderTimerButton = () => {
    //change button to finish retrieval and if timing call a separate function that renders the
    if (isTiming) {
      return (
        <Button variant='text' color='primary' onClick={toggleTimer}>
          End Retrieval
        </Button>
      );
      renderTimer();
    } else {
      return (
        <Button variant='text' color='primary' onClick={toggleTimer}>
          Begin Retrieval
        </Button>
      );
    }
  };

  return (
    <RootContainer>
      <BackButtonContainer>
        <IconButton onClick={goBack}>
          <ArrowBackRoundedIcon />
        </IconButton>
      </BackButtonContainer>

      {authContext.authenticated && (
        <AddEditToolComponent tool={tool} actionButtonFunction={updateTool} />
      )}

      <Container maxWidth='md'>
        <ToolViewContainer>
          {renderImage()}
          <Typography variant='h6'>Keywords</Typography>
          {renderKeywords()}
          {authContext.authenticated && renderDeleteButton()}
          {renderTimerButton()}
          {renderTimer()}
        </ToolViewContainer>
      </Container>
    </RootContainer>
  );
};

export default withToolData(ToolView);
