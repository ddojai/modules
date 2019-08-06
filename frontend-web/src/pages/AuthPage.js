import React, { Component } from 'react';
import PageTemplate from 'components/common/PageTemplate';
import LoginContainers from 'containers/auth/LoginContainers';

const AuthPage = () => {
  return (
    <PageTemplate>
      <LoginContainers/>
    </PageTemplate>
  );
};

export default AuthPage;
