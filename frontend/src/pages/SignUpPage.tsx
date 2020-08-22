import React from 'react';
import { Container } from '@material-ui/core';
import AuthTemplate from 'components/common/AuthTemplate';
import SignUpForm from 'components/signUp/SignUpForm';

function SignUpPage() {
  return (
    <Container>
      <AuthTemplate>
        <SignUpForm />
      </AuthTemplate>
    </Container>
  );
}

export default SignUpPage;
