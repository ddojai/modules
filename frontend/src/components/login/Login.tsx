import React from 'react';
import LoginForm from './LoginForm';
import { Link } from 'react-router-dom';
import SocialLogin from './SocialLogin';
import { makeStyles, colors, Box, Typography } from '@material-ui/core';
import { Alert } from '@material-ui/lab';

const useStyles = makeStyles({
  loginContainer: {
    textAlign: 'center',
  },
  loginContent: {
    background: colors.common.white,
    boxShadow: '0 1px 11px rgba(0, 0, 0, 0.27)',
    borderRadius: '2px',
    width: '500px',
    display: 'inline-block',
    marginTop: '30px',
    verticalAlign: 'middle',
    position: 'relative',
    padding: '35px',
  },
  socialBtn: {
    marginBottom: '15px',
    fontWeight: 400,
    fontSize: '16px',
  },
  orSeparator: {
    borderBottom: '1px solid #eee',
    padding: '10px 0',
    position: 'relative',
    display: 'block',
    marginTop: '20px',
    marginBottom: '30px',
    fontSize: '1em',
  },
  orText: {
    position: 'absolute',
    left: '46%',
    top: '0',
    background: '#fff',
    padding: '10px',
    color: 'rgba(0,0,0,.45)',
  },
  signupLink: {
    color: 'rgba(0, 0, 0, 0.65)',
    fontSize: '14px',
  },
});

function Login(props) {
  const classes = useStyles();
  const error = props.location.state.error;

  return (
    <Box className={classes.loginContainer}>
      <Box className={classes.loginContent}>
        <Typography variant="h5">Login to Social</Typography>
        <SocialLogin />
        {error && <Alert severity="error">{error}</Alert>}
        <Box className={classes.orSeparator}>
          <Box component="span" className={classes.orText}>
            OR
          </Box>
        </Box>
        <LoginForm />
        <Box component="span" className={classes.signupLink}>
          New user? <Link to="/signup">Sign up!</Link>
        </Box>
      </Box>
    </Box>
  );
}

export default Login;
