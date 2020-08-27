import { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { userAsync, goToHome } from 'modules/user';
import { RootState } from 'modules';
import { ACCESS_TOKEN } from 'constant';

export default function useOAuth2(props: { location: { search: string } }) {
  const [token, setToken] = useState('');
  const [error, setError] = useState('');
  const userMeResponse = useSelector(
    (state: RootState) => state.user.userMeResponse
  );
  const dispatch = useDispatch();

  const getUrlParameter = useCallback(
    (name) => {
      const regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
      const results = regex.exec(props.location.search);
      return results === null
        ? ''
        : decodeURIComponent(results[1].replace(/\+/g, ' '));
    },
    [props.location.search]
  );

  useEffect(() => {
    setToken(getUrlParameter('token'));
    setError(getUrlParameter('error'));
  }, [getUrlParameter]);

  useEffect(() => {
    if (token) {
      dispatch(userAsync.request(token));
      try {
        localStorage.setItem(ACCESS_TOKEN, token);
      } catch (e) {
        console.log('localStorage is not working');
      }
    }
  }, [dispatch, token]);

  useEffect(() => {
    const { data } = userMeResponse;
    if (data) {
      dispatch(goToHome());
    }
  }, [dispatch, userMeResponse]);

  return {
    error,
  };
}
