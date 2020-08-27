import { createAction, createAsyncAction } from 'typesafe-actions';
import { UserMeSuccess } from 'api/user';
import { AxiosError } from 'axios';

// 액션 type
// 새로고침 이후 임시 로그인 처리
export const TEMP_SET_USER = 'user/TEMP_SET_USER';

export const USER_ME = 'user/USER_ME';
export const USER_ME_SUCCESS = 'user/USER_ME_SUCCESS';
export const USER_ME_ERROR = 'user/USER_ME_ERROR';

export const LOGOUT = 'user/LOGOUT';

export const GO_TO_HOME = 'user/GO_TO_HOME';

// 액션 생성 함수
export const tempSetUser = createAction(TEMP_SET_USER, (user) => user)();

export const userAsync = createAsyncAction(
  USER_ME,
  USER_ME_SUCCESS,
  USER_ME_ERROR
)<string, UserMeSuccess, AxiosError>();

export const logout = createAction(LOGOUT)();

export const goToHome = createAction(GO_TO_HOME)();