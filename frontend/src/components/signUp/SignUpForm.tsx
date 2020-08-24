import React from 'react';
import { Input, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import useSignUp from 'hooks/useSignUp';

const useStyles = makeStyles({
  styledInput: {
    margin: 0,
    listStyle: 'none',
    position: 'relative',
    display: 'inline-block',
    padding: '4px 11px',
    width: '100%',
    height: '45px',
    fontSize: '0.87em',
    lineHeight: '45px',
    color: 'rgba(0,0,0,.80)',
    backgroundColor: '#fff',
    backgroundImage: 'none',
    border: '1px solid #e8e8e8',
    borderRadius: '4px',
    transition: 'all .3s',
    boxShadow: 'inset 0 1px 1px rgba(0,0,0,.075)',
  },

  signUpButton: {
    marginTop: '1rem',
    marginBottom: '1rem',
  },
});

function SignUpForm() {
  const classes = useStyles();
  const { signUp, onChange, onSubmit } = useSignUp();

  return (
    <form onSubmit={onSubmit}>
      <Input
        className={classes.styledInput}
        name="name"
        placeholder="Name"
        onChange={onChange}
        value={signUp.name}
      />
      <Input
        className={classes.styledInput}
        autoComplete="email"
        name="email"
        placeholder="Email"
        onChange={onChange}
        value={signUp.email}
      />
      <Input
        className={classes.styledInput}
        autoComplete="new-password"
        name="password"
        placeholder="Password"
        type="password"
        onChange={onChange}
        value={signUp.password}
      />
      <Input
        className={classes.styledInput}
        autoComplete="new-password"
        name="passwordConfirm"
        placeholder="Password Confirm"
        type="password"
        onChange={onChange}
        value={signUp.passwordConfirm}
      />
      <Button
        className={classes.signUpButton}
        variant="contained"
        color="primary"
        fullWidth
      >
        Sign Up
      </Button>
    </form>
  );
}

export default SignUpForm;
