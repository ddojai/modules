import React from 'react';
import { Container } from '@material-ui/core';
import AuthTemplate from 'components/auth/AuthTemplate';
import AuthForm from 'components/auth/AuthForm';

function LoginPage() {
  return (
    <Container>
      <AuthTemplate>
        <AuthForm type="login" />
      </AuthTemplate>
    </Container>
  );
}

export default LoginPage;
