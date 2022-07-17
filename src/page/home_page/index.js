import React, { useEffect, useState } from 'react';
import { fetchSharedVideos } from 'redux/media';
import { useDispatch } from 'react-redux';
import { Typography, Grid, Container } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import moment from 'moment';
import IframeSrc from 'assets/images/iframe.png';

const useStyles = makeStyles({
  videoWrapper: {
    marginTop: 18,
  },
  title: {
    color: '#ff2803',
  },
  img: {
    width: '100%',
    objectFit: 'contain',
  },
});

const HomePage = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const [sharedVideos, setSharedVideos] = useState([]);

  useEffect(() => {
    (async () => {
      const result = await dispatch(fetchSharedVideos());
      if (result && result.e) return alert('Share failed');
      setSharedVideos(result);
    })();
  }, [dispatch]);
  return (
    <Container>
      <Grid container>
        {sharedVideos.map((videoDetails, index) => (
          <Grid
            item
            container
            key={`${videoDetails.userEmail}_${index}`}
            className={index ? classes.videoWrapper: ''}
            spacing={2}
          >
            <Grid item xs={5} md={3}>
              <img className={classes.img} src={IframeSrc} alt="iframe" />
            </Grid>
            <Grid item xs={7} md={9}>
              <Typography variant="h4" className={classes.title}>
                {videoDetails.url}
              </Typography>
              <Typography>Shared by: {videoDetails.userEmail}</Typography>
              {videoDetails.date && (
                <Typography>
                  Date: {moment(videoDetails.date).format('DD-MMM-YYYY HH:mm')}
                </Typography>
              )}
            </Grid>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default HomePage;
