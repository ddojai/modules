import React, { Component } from "react";
import PageTemplate from "components/common/PageTemplate";
import SocialLogin from "components/auth/SocialLogin";

const AuthPage = () => {
  return (
    <PageTemplate>
      <SocialLogin/>
    </PageTemplate>
  );
};

export default AuthPage;