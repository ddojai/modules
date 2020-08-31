import React from 'react';
import { Container } from '@material-ui/core';
import Login, { LoginProps } from 'components/login/Login';
import Header from 'components/common/Header';

function LoginPage(props: LoginProps) {
  return (
    <Container>
      <Header />
      <Login {...props}/>
    </Container>
  );
}

export default LoginPage;
