import React from 'react';
import { Container } from '@material-ui/core';
import AuthTemplate from 'components/common/AuthTemplate';
import LoginForm from 'components/login/LoginForm';

function LoginPage() {
  return (
    <Container>
      <AuthTemplate>
        <LoginForm />
      </AuthTemplate>
    </Container>
  );
}

export default LoginPage;
