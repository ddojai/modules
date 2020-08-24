import React from 'react';
import { makeStyles, Box, Button } from '@material-ui/core';
import fbLogo from 'img/fb-logo.png';
import googleLogo from 'img/google-logo.png';
import { GOOGLE_AUTH_URL, FACEBOOK_AUTH_URL } from 'constant';

const useStyles = makeStyles({
  socialSignUp: {},
  socialButton: {
    display: 'block',
    width: '100%',
    marginBottom: '15px',
    fontWeight: 400,
    fontSize: '16px',
  },
  google: {
    height: '32px',
    float: 'left',
    marginTop: '10px',
  },
  facebook: {
    height: '24px',
    marginLeft: '3px',
  },
});

function SocialSignUp(props) {
  const classes = useStyles();

  return (
    <Box className={classes.socialSignUp}>
      <Box className={classes.socialButton}>
        <Button href={GOOGLE_AUTH_URL}>
          <img className={classes.google} src={googleLogo} alt="Google" /> Sign
          up with Google
        </Button>
      </Box>
      <Box className={classes.socialButton}>
        <Button href={FACEBOOK_AUTH_URL}>
          <img className={classes.facebook} src={fbLogo} alt="Facebook" /> Sign
          up with Facebook
        </Button>
      </Box>
    </Box>
  );
}

export default SocialSignUp;
