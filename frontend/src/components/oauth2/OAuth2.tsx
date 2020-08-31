import React from 'react';
import { Redirect } from 'react-router-dom';
import useOAuth2 from 'hooks/useOAuth2';

export interface OAuth2Props {
  location: { search: string };
}

function OAuth2(props: OAuth2Props) {
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
