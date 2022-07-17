import React from 'react';
import { useDispatch } from 'react-redux';
import { signOut } from 'redux/user';
import { withRouter } from 'react-router-dom';
import { Grid, Typography, Button } from '@material-ui/core';

const MainMenu = (props) => {
  const { currentUser, history } = props;
  const dispatch = useDispatch();
  const handleLogout = () => dispatch(signOut());

  const handleClickShare = () => history.push('/share');
  return (
    <Grid container spacing={2} alignItems="center">
      <Grid item>
        <Typography>Welcome {currentUser.email}</Typography>
      </Grid>
      <Grid item>
        <Button onClick={handleClickShare}>Share a movie</Button>
      </Grid>
      <Grid item>
        <Button onClick={handleLogout}>Log out</Button>
      </Grid>
    </Grid>
  );
};

export default withRouter(MainMenu);
