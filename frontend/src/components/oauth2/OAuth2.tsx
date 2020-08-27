import React from 'react';
import { Redirect } from 'react-router-dom';
import useOAuth2 from 'hooks/useOAuth2';

function OAuth2(props) {
  const { error } = useOAuth2(props);

  if (!error) {
    return null;
  }

  return (
    <Redirect
      to={{
        pathname: '/login',
        state: { from: props.location, error: error },
      }}
    />
  );
}

export default OAuth2;
