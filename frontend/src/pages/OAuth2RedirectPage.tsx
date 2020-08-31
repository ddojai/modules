import React from 'react';
import { Container } from '@material-ui/core';
import OAuth2, { OAuth2Props } from 'components/oauth2/OAuth2';

function OAuth2RedirectPage(props: OAuth2Props) {
  return (
    <Container>
      <OAuth2 {...props}/>
    </Container>
  );
}

export default OAuth2RedirectPage;