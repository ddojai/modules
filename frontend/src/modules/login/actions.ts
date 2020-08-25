import { createAsyncAction } from 'typesafe-actions';
import { LoginSuccess } from 'api/login';
import { AxiosError } from 'axios';

// 액션 type
export const LOGIN = 'login/LOGIN';
export const LOGIN_SUCCESS = 'login/LOGIN_SUCCESS';
export const LOGIN_ERROR = 'login/LOGIN_ERROR';

// 액션 생성 함수
export const loginAsync = createAsyncAction(
  LOGIN,
  LOGIN_SUCCESS,
  LOGIN_ERROR
)<undefined, LoginSuccess, AxiosError>();