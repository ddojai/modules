import React from 'react';
import { Box, colors, Input, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import useLogin from 'hooks/useLogin';

const useStyles = makeStyles({
  authFormBox: {
    '& h3': {
      margin: 0,
      color: colors.grey[800],
      marginBottom: '1rem',
    },
  },

  styledInput: {
    fontSize: '1rem',
    border: 'none',
    borderBottom: '1px solid ' + colors.grey[500],
    paddingBottom: '0.5rem',
    outline: 'none',
    width: '100%',
    '&:forcus': {
      color: colors.teal[700],
      borderBottom: '1px solid ' + colors.grey[700],
    },
    '& + &': {
      marginTop: '1rem',
    },
  },

  footerBox: {
    marginTop: '2rem',
    textAlign: 'right',
    '& a': {
      color: colors.grey[600],
      textDecoration: 'underline',
      '&:hover': {
        color: colors.grey[900],
      },
    },
  },

  loginButton: {
    marginTop: '1rem',
  },
});

function LoginForm() {
  const classes = useStyles();
  const { login, onChange, onSubmit } = useLogin();
  const text = '로그인';

  return (
    <Box className={classes.authFormBox}>
      <h3>{text}</h3>
      <form onSubmit={onSubmit}>
        <Input
          className={classes.styledInput}
          autoComplete="username"
          name="username"
          placeholder="아이디"
          onChange={onChange}
          value={login.username}
        />
        <Input
          className={classes.styledInput}
          autoComplete="new-password"
          name="password"
          placeholder="비밀번호"
          type="password"
          onChange={onChange}
          value={login.password}
        />
        <Button
          className={classes.loginButton}
          variant="contained"
          color="primary"
          fullWidth
        >
          {text}
        </Button>
      </form>
      <Box className={classes.footerBox}>
        <Link to="/signup">회원가입</Link>
      </Box>
    </Box>
  );
}

export default LoginForm;
