import React from 'react';
import { Box, colors } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';

const useStyles = makeStyles({
  authTemplateBox: {
    position: "absolute",
    left: 0,
    top: 0,
    bottom: 0,
    right: 0,
    background: colors.grey[300],
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  whiteBox: {
    boxShadow: '0 0 8px rgba(0,0,0,0.025)',
    padding: '2rem',
    width: '360px',
    background: colors.common.white,
    borderRadius: '2px',
  },
  logoBox: {
    display: 'block',
    paddingBottom: '2rem',
    textAlign: 'center',
    fontWeight: 'bold',
    letterSpacing: '2px',
  },
});

interface AuthTemplateProps {
  children: React.ReactNode;
}

function AuthTemplate({ children }: AuthTemplateProps) {
  const classes = useStyles();

  return (
    <Box className={classes.authTemplateBox}>
      <Box className={classes.whiteBox}>
        <Box className={classes.logoBox}>
          <Link to="/">FINANCIAL INDEPENDENCE</Link>
        </Box>
        {children}
      </Box>
    </Box>
  );
}

export default AuthTemplate;
