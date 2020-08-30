import React from 'react';
import { OutlinedInput, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import useLogin from 'hooks/useLogin';
import { Alert } from '@material-ui/lab';

const useStyles = makeStyles((theme) => ({
  loginForm: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  styledInput: {},
  loginButton: {
    marginTop: '1rem',
    marginBottom: '1rem',
  },
}));

function LoginForm() {
  const classes = useStyles();
  const { form, onChange, onSubmit, error } = useLogin();

  return (
    <form onSubmit={onSubmit} className={classes.loginForm}>
      <OutlinedInput
        className={classes.styledInput}
        fullWidth
        autoComplete="email"
        name="email"
        placeholder="Email"
        onChange={onChange}
        value={form.email}
      />
      <OutlinedInput
        className={classes.styledInput}
        fullWidth
        autoComplete="new-password"
        name="password"
        placeholder="Password"
        type="password"
        onChange={onChange}
        value={form.password}
      />
      <Button
        className={classes.loginButton}
        variant="contained"
        color="primary"
        type="submit"
        size="large"
        fullWidth
      >
        Login
      </Button>
      {error && <Alert severity="error">{error}</Alert>}
    </form>
  );
}

export default LoginForm;
