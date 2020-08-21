import React from 'react';
import { Container } from '@material-ui/core';
import AuthTemplate from 'components/auth/AuthTemplate';
import AuthForm from 'components/auth/AuthForm';

function SignUpPage() {
  return (
    <Container>
      <AuthTemplate>
        <AuthForm type="signUp"/>
      </AuthTemplate>
    </Container>
  );
}

export default SignUpPage;
