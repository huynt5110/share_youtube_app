import React from 'react';
import { useDispatch } from 'react-redux';
import { Formik, Field } from 'formik';
import { Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { signInUser, registerUser } from 'redux/user';

const validate = (values) => {
  const errors = {};
  if (!values.email) {
    errors.email = 'Required';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
    errors.email = 'Invalid email address';
  }
  return errors;
};

const useStyles = makeStyles({
  inputWrapper: {
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
  },
  errorMessage: {
    position: 'absolute',
    bottom: '-15px',
  },
});

const LoginComp = () => {
  const dispatch = useDispatch();
  const classes = useStyles();

  const handleRegister = async (values, { setSubmitting }) => {
    const result = await dispatch(registerUser(values.email, values.password));
    setSubmitting(false);
    if (result && result.e) return alert('Register failed');
    alert('Register successfully !');
  };

  const handleLogin = async (values, { setSubmitting }) => {
    const result = await dispatch(signInUser(values.email, values.password));
    setSubmitting(false);
    if (result.e) return alert('Login failed');
  };
  
  const handleSubmit = async (values, { setSubmitting }) => {
  console.log("🚀 ~ file: loginForm.js ~ line 48 ~ handleSubmit ~ values", values)
    if (parseInt(values.type)) return handleLogin(values, { setSubmitting });
    return handleRegister(values, { setSubmitting });
  };

  return (
    <Formik
      initialValues={{
        email: 'hello@feathersjs.com',
        password: 'supersecret',
        type: 1,
      }}
      validate={validate}
      onSubmit={handleSubmit}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting,
      }) => (
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item>
              <Field as="select" name="type">
                <option value={1}>Login</option>
                <option value={0}>Register</option>
              </Field>
            </Grid>
            <Grid item className={classes.inputWrapper}>
              <input
                type="email"
                name="email"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
              />
              <Typography className={classes.errorMessage}>
                {errors.email && touched.email && errors.email}
              </Typography>
            </Grid>
            <Grid item className={classes.inputWrapper}>
              <input
                type="password"
                name="password"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password}
              />
              <Typography className={classes.errorMessage}>
                {errors.password && touched.password && errors.password}
              </Typography>
            </Grid>
            <Grid item>
              <button type="submit" disabled={isSubmitting}>
                Submit
              </button>
            </Grid>
          </Grid>
        </form>
      )}
    </Formik>
  );
};

export default LoginComp;
