import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';

// Material UI
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import AccountCircleRoundedIcon from '@material-ui/icons/AccountCircleRounded';

const AccountMenu = ({ logout }) => {
  const history = useHistory();
  const [anchor, setAnchor] = useState(null);

  const handleIconClick = event => setAnchor(event.currentTarget);
  const handleClose = () => setAnchor(null);
  const handleLogout = () => {
    handleClose();
    logout();
  };
  const handleAccount = () => history.push('/Account');

  return (
    <React.Fragment>
      <IconButton color='primary' onClick={handleIconClick}>
        <AccountCircleRoundedIcon />
      </IconButton>
      <Menu anchorEl={anchor} open={Boolean(anchor)} onClose={handleClose}>
        {/* <MenuItem onClick={handleAccount}>Account</MenuItem> */}
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
    </React.Fragment>
  );
};

export default AccountMenu;
