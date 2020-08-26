import React from 'react';
import { Box, Button, makeStyles, Link } from '@material-ui/core';

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
  spacer: {
    height: '4rem',
  },
}));

function Header() {
  const classes = useStyles();

  return (
    <>
      <Box className={classes.header}>
        <Link className={classes.logo} href="/">
          Financial Independence
        </Link>
        <Box className={classes.right}>
          <Button variant="contained" href="/login">Login</Button>
          <Button variant="contained" href="/signup">SignUp</Button>
        </Box>
      </Box>
      <Box className={classes.spacer} />
    </>
  );
}

export default Header;
