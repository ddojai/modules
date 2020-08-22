import { ActionType } from 'typesafe-actions';
import * as actions from './actions';

// 액션들의 타입스크립트 타입 준비
export type LoginAction = ActionType<typeof actions>;

// 상태를 위한 타입 선언
export type LoginState = {
  username: string;
  password: string;
};