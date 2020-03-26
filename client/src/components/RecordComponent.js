import React, { useState } from 'react';
import styled from 'styled-components';
import {recordAudio} from "../apiCalls.js";

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

const RecordComponent  = () => {
return (
    <React.Fragment>
        <Button onClick = {recordAudio}>
             Record
        </Button>
    </React.Fragment>

);
};
export default RecordComponent;