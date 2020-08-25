import { createAsyncAction } from 'typesafe-actions';
import { SignUpSuccess } from 'api/signUp';
import { AxiosError } from 'axios';

// 액션 type
export const SIGN_UP = 'signUp/SIGN_UP';
export const SIGN_UP_SUCCESS = 'signUp/SIGN_UP_SUCCESS';
export const SIGN_UP_ERROR = 'signUp/SIGN_UP_ERROR';

// 액션 생성 함수
export const signUpAsync = createAsyncAction(
  SIGN_UP,
  SIGN_UP_SUCCESS,
  SIGN_UP_ERROR
)<
  { name: string; email: string; password: string },
  SignUpSuccess,
  AxiosError
>();
