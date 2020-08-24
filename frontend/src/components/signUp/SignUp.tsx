import React from 'react';
import { makeStyles, Box, colors, Typography } from '@material-ui/core';
import SignUpForm from './SignUpForm';
import SocialSignUp from './SocialSignUp';
import { Link } from 'react-router-dom';

const useStyles = makeStyles({
  signUpContainer: {
    textAlign: 'center',
  },
  signUpContent: {
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

function SignUp() {
  const classes = useStyles();

  return (
    <Box className={classes.signUpContainer}>
      <Box className={classes.signUpContent}>
        <Typography variant="h5">SignUp with Social</Typography>
        <SocialSignUp />
        <Box className={classes.orSeparator}>
          <Box component="span" className={classes.orText}>
            OR
          </Box>
        </Box>
        <SignUpForm />
        <Box component="span" className={classes.signupLink}>
          Already have an account? <Link to="/login">Login!</Link>
        </Box>
      </Box>
    </Box>
  );
}

export default SignUp;
