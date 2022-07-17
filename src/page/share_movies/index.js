import React from 'react';
import { Formik } from 'formik';
import { useDispatch } from 'react-redux';
import { shareVideo } from 'redux/media';
import { Typography, Grid, Container, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router-dom';

const validation = (values) => {
  const errors = {};
  if (!values.url) errors.url = 'Required';
  return errors;
};

const useStyles = makeStyles({
  formWrapper: {
    marginTop: 30,
    border: '1px solid black',
    padding: 24,
  },
  inputWrapper: {
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
  },
  btnSubmit: {
    marginTop: 12,
    width: '50%'
  },
});

const SubmitUrlForm = ({ history }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const handleSubmitUrl = async (values, { setSubmitting }) => {
    const result = await dispatch(shareVideo(values.url));
    setSubmitting(false);
    if (result && result.e) return alert('Share failed');
    history.push('/');
    alert('Shared successfully!');
  };
  return (
    <div>
      <Formik
        initialValues={{ url: '' }}
        validate={validation}
        onSubmit={handleSubmitUrl}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
          isValid,
          dirty,
          ...other
        }) => {
          return (
            <form onSubmit={handleSubmit}>
              <Container maxWidth="sm" className={classes.formWrapper}>
                <Grid container wrap="nowrap">
                  <Grid item xs={4} md={4}>
                    <Typography>Youtube URL</Typography>
                  </Grid>
                  <Grid item container direction="column">
                    <input
                      type="url"
                      name="url"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.url}
                    />

                    <Button
                      type="submit"
                      className={classes.btnSubmit}
                      disabled={isSubmitting || !isValid || !dirty}
                      variant="contained"
                    >
                      Submit
                    </Button>
                  </Grid>
                </Grid>
              </Container>
            </form>
          );
        }}
      </Formik>
    </div>
  );
};

export default withRouter(SubmitUrlForm);
