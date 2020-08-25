import { ActionType } from 'typesafe-actions';
import * as actions from './actions';
import { LoginSuccess } from 'api/login';

// 액션들의 타입스크립트 타입 준비
export type LoginAction = ActionType<typeof actions>;

// 상태를 위한 타입 선언
export type LoginState = {
  loginResponse: {
    loading: boolean;
    error: Error | null;
    data: LoginSuccess | null;
  };
};
