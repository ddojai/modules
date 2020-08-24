import React from 'react';
import { Container } from '@material-ui/core';
import Header from 'components/common/Header';
import SignUp from 'components/signUp/SignUp';

function SignUpPage() {
  return (
    <Container>
      <Header />
      <SignUp />
    </Container>
  );
}

export default SignUpPage;
