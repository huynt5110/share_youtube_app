import React from 'react';
import { Grid, Container } from '@material-ui/core';

import { makeStyles } from '@material-ui/core/styles';
import AppBarMovies from './Appbar';

const useStyles = makeStyles({
  appHeader: {
    maxHeight: 120,
    padding: 12,
  },
  childrenWrapper: {
    flex: 1,
    padding: 12,
  },
});

const DashboardLayout = ({ children }) => {
  const classes = useStyles();
  return (
    <Grid container direction="column">
      <Container className={classes.appHeader}>
        <AppBarMovies />
      </Container>
      <Grid className={classes.childrenWrapper}>{children}</Grid>
    </Grid>
  );
};

export default DashboardLayout;
