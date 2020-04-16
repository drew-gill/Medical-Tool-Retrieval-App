import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

// Material UI
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';

const RetrievalComponent = ({ addRetrieval }) => {
  const [isTiming, setIsTiming] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [timePassed, setTimePassed] = useState(0);
  const [intervalId, setIntervalId] = useState(null);

  useEffect(() => {
    if (isTiming) {
      const intId = setInterval(() => {
        setTimePassed(oldTime => oldTime + 1);
      }, 1000);
      setIntervalId(intId);
    } else if (intervalId !== null) {
      clearInterval(intervalId);
      setIntervalId(null);
    }
  }, [isTiming]);

  const toggleTimer = async () => {
    if (!isTiming) {
      setIsTiming(true);
    } else {
      setIsTiming(false);
      setIsLoading(true);

      await addRetrieval(timePassed);

      setTimePassed(0);
      setIsLoading(false);
    }
  };

  const renderTimer = () => {
    if (isTiming) {
      return (
        <Typography style={{ marginTop: 10 }} variant='body1'>
          {Math.floor(timePassed / 60)} m : {timePassed % 60} s
        </Typography>
      );
    } else return;
  };

  const renderTimerButton = () => {
    //change button to finish retrieval and if timing call a separate function that renders the
    const text = isTiming ? 'End Retrieval' : 'Start Retrieval';

    return (
      <Button
        style={{ marginTop: 10, marginBottom: 20 }}
        variant='text'
        color='primary'
        onClick={toggleTimer}
      >
        {text}
      </Button>
    );
  };

  return (
    <React.Fragment>
      {isLoading ? (
        <CircularProgress
          style={{ alignSelf: 'center', marginTop: 10, marginBottom: 20 }}
        />
      ) : (
        <React.Fragment>
          {renderTimer()}
          {renderTimerButton()}
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default RetrievalComponent;
