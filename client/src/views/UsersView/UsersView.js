import React, { useEffect, useState, useContext } from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';

// Custom
import Auth, { AuthContext } from '../../Auth';
import AddUserPopup from '../../components/AddUserPopup';
import UserRow from '../../components/UserRow';
import ConfirmDialog from '../../components/ConfirmDialog';

// Material UI
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import IconButton from '@material-ui/core/IconButton';
import ArrowBackRoundedIcon from '@material-ui/icons/ArrowBackRounded';
import AddRoundedIcon from '@material-ui/icons/AddRounded';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Fab from '@material-ui/core/Fab';
import CircularProgress from '@material-ui/core/CircularProgress';

// Styled components
const RootContainer = styled.div`
  padding-top: 120px;
  padding-bottom: 40px;
`;

const ViewContainer = styled.div`
  width: 100%;
  padding: 20px;
  box-sizing: border-box;
  border-radius: 5px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  flex-direction: column;
  text-align: center;
`;

const BackButtonContainer = styled.div`
  position: fixed;
  top: 40px;
  left: 40px;
`;

const UsersView = () => {
  const authContext = useContext(AuthContext);
  const history = useHistory();
  const [users, setUsers] = useState(undefined);
  const [popupOpen, setPopupOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState({});

  const goBack = () => history.goBack();
  const closePopup = () => setPopupOpen(false);
  const openPopup = () => setPopupOpen(true);
  const openConfirm = (u) => setSelectedUser(u);
  const closeConfirm = () => setSelectedUser({});

  const deleteUser = async () => {
    const u = selectedUser;
    // Delete the user and update the state
    await Auth.deleteUser(u._id);
    const newUsers = [];
    users.forEach((user) => {
      if (user._id !== u._id) {
        newUsers.push(user);
      }
    });
    setUsers(newUsers);
    setSelectedUser({});
  };

  const fetchUsers = async () => {
    const users = await Auth.getUsers();
    setUsers(users);
  };

  const createUser = async (username, password) => {
    const newUser = await Auth.createUser(username, password);
    console.log(newUser);
    setUsers((oldUsers) => [...oldUsers, newUser]);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const renderTable = () => {
    if (users.length > 0) {
      return (
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Username</TableCell>
                <TableCell>ID</TableCell>
                <TableCell align='right'></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((u) => (
                <UserRow user={u} key={u._id} deleteFunction={openConfirm} />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      );
    } else {
      return (
        <Typography variant='body1'>No users other than master.</Typography>
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

      <ConfirmDialog
        title={`Delete user ${selectedUser.username}?`}
        description={`Are you sure that you want to delete user ${selectedUser.username}?`}
        open={selectedUser.username !== undefined}
        closeFunction={closeConfirm}
        confirmFunction={deleteUser}
      />

      <Fab
        style={{ position: 'fixed', bottom: 20, right: 20 }}
        color='primary'
        onClick={openPopup}
      >
        <AddRoundedIcon />
      </Fab>

      <AddUserPopup
        action={createUser}
        open={popupOpen}
        handleClose={closePopup}
      />

      <Container maxWidth='md'>
        <ViewContainer>
          <Typography variant='h6' style={{ marginBottom: 20 }}>
            Users
          </Typography>
          {users !== undefined ? renderTable() : <CircularProgress />}
        </ViewContainer>
      </Container>
    </RootContainer>
  );
};

export default UsersView;
