import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';

// Custom
import { AuthContext } from '../Auth';

// Material UI
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import AccountCircleRoundedIcon from '@material-ui/icons/AccountCircleRounded';

const AccountMenu = ({ logout }) => {
  const authContext = useContext(AuthContext);
  const history = useHistory();
  const [anchor, setAnchor] = useState(null);

  const handleIconClick = (event) => setAnchor(event.currentTarget);
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
        {authContext.isMaster && (
          <MenuItem onClick={handleAccount}>Account</MenuItem>
        )}
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
    </React.Fragment>
  );
};

export default AccountMenu;
