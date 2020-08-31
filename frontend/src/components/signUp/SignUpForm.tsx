import React from 'react';
import { OutlinedInput, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import useSignUp from 'hooks/useSignUp';
import { Alert } from '@material-ui/lab';

const useStyles = makeStyles((theme) => ({
  signUpForm: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  styledInput: {},
  signUpButton: {
    marginTop: '1rem',
    marginBottom: '1rem',
  },
}));

function SignUpForm() {
  const classes = useStyles();
  const { form, onChange, onSubmit, error } = useSignUp();

  return (
    <form onSubmit={onSubmit} className={classes.signUpForm}>
      <OutlinedInput
        className={classes.styledInput}
        fullWidth
        name="name"
        placeholder="Name"
        onChange={onChange}
        value={form.name}
      />
      <OutlinedInput
        className={classes.styledInput}
        fullWidth
        autoComplete="email"
        name="email"
        placeholder="Email"
        type="email"
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
      <OutlinedInput
        className={classes.styledInput}
        fullWidth
        autoComplete="new-password"
        name="passwordConfirm"
        placeholder="Password Confirm"
        type="password"
        onChange={onChange}
        value={form.passwordConfirm}
      />
      <Button
        className={classes.signUpButton}
        variant="contained"
        color="primary"
        type="submit"
        size="large"
        fullWidth
      >
        Sign Up
      </Button>
      {error && <Alert severity="error">{error}</Alert>}
    </form>
  );
}

export default SignUpForm;
