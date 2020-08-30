import React from 'react';
import fbLogo from 'img/fb-logo.png';
import googleLogo from 'img/google-logo.png';
import { GOOGLE_AUTH_URL, FACEBOOK_AUTH_URL } from 'constant';
import { makeStyles, Box, Button, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  socialLogin: {
    marginTop: '1rem',
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  google: {
    height: '32px',
    position: 'absolute',
    left: 2,
    top: 2,
  },
  facebook: {
    height: '24px',
    position: 'absolute',
    left: 4,
    top: 6,
  },
}));

interface TextMap {
  login: string;
  signUp: string;
}

const textMap: TextMap = {
  login: 'LOGIN',
  signUp: 'SIGNUP',
};

interface SocialLoginProps {
  type: 'login' | 'signUp';
}

function SocialLogin({ type }: SocialLoginProps) {
  const classes = useStyles();
  const text = textMap[type];

  return (
    <Box className={classes.socialLogin}>
      <Button
        href={GOOGLE_AUTH_URL}
        variant="outlined"
        fullWidth
        size="large"
        startIcon={
          <img className={classes.google} src={googleLogo} alt="Google" />
        }
      >
        <Typography variant="button">{text} With Google</Typography>
      </Button>
      <Button
        href={FACEBOOK_AUTH_URL}
        variant="outlined"
        fullWidth
        size="large"
        startIcon={
          <img className={classes.facebook} src={fbLogo} alt="Facebook" />
        }
      >
        <Typography variant="button">{text} With Facebook</Typography>
      </Button>
    </Box>
  );
}

export default SocialLogin;
