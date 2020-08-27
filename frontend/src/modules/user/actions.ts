import { createAction, createAsyncAction } from 'typesafe-actions';
import { UserMeSuccess } from 'api/user';
import { AxiosError } from 'axios';

// 액션 type
export const USER_ME = 'user/USER_ME';
export const USER_ME_SUCCESS = 'user/USER_ME_SUCCESS';
export const USER_ME_ERROR = 'user/USER_ME_ERROR';

export const LOGOUT = 'user/LOGOUT';

export const GO_TO_HOME = 'user/GO_TO_HOME';
export const GO_TO_LOGIN = 'user/GO_TO_LOGIN';

// 액션 생성 함수
export const userAsync = createAsyncAction(
  USER_ME,
  USER_ME_SUCCESS,
  USER_ME_ERROR
)<string, UserMeSuccess, AxiosError>();

export const logout = createAction(LOGOUT)();

export const goToHome = createAction(GO_TO_HOME)();
export const goToLogin = createAction(GO_TO_LOGIN)();