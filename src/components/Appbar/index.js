import React from 'react';
import { Grid, Typography } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';

import LoginForm from './loginForm';
import MainMenu from './mainMenu';

const useStyles = makeStyles({
  borderBottom: {
    padding: '12px 0px',
    borderBottom: '1px solid black',
  },
});

const AppBarMovies = (props) => {
  const classes = useStyles();
  const user = useSelector((state) => state.user) || {};

  return (
    <Grid
      container
      justify="space-between"
      className={classes.borderBottom}
      alignItems="center"
    >
      <Typography variant="h4">Funny Movie</Typography>
      <Grid>{user.isSignIn ? <MainMenu currentUser={user.currentUser} /> : <LoginForm />}</Grid>
    </Grid>
  );
};

export default AppBarMovies;
