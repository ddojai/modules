import React from 'react';
import { Box, Button, makeStyles, Link } from '@material-ui/core';
import useHeader from 'hooks/useHeader';

const useStyles = makeStyles((theme) => ({
  header: {
    height: '4rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  logo: {
    fontSize: '1.125rem',
    fontWeight: 800,
    letterSpacing: '2px',
  },
  right: {
    display: 'flex',
    alignItems: 'center',
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  userInfo: {
    fontWeight: 800,
    marginRight: '1rem',
  },
  spacer: {
    height: '4rem',
  },
}));

function Header() {
  const classes = useStyles();
  const { userMeResponse, onLogout } = useHeader();
  const { data } = userMeResponse;

  return (
    <>
      <Box className={classes.header}>
        <Link className={classes.logo} href="/">
          Open Exercise
        </Link>
        {data ? (
          <Box className={classes.right}>
            <Box className={classes.userInfo}>{data.email}</Box>
            <Button variant="contained" onClick={onLogout}>
              로그아웃
            </Button>
          </Box>
        ) : (
          <Box className={classes.right}>
            <Button variant="contained" href="/login">
              Login
            </Button>
            <Button variant="contained" href="/signup">
              SignUp
            </Button>
          </Box>
        )}
      </Box>
      <Box className={classes.spacer} />
    </>
  );
}

export default Header;
