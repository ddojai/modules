import { ActionType } from 'typesafe-actions';
import * as actions from './actions';
import { SignUpSuccess } from 'api/signUp';
import { AsyncState } from 'lib/reducerUtils';

// 액션들의 타입스크립트 타입 준비
export type SignUpAction = ActionType<typeof actions>;

// 상태를 위한 타입 선언
export type SignUpState = {
  signUpResponse: AsyncState<SignUpSuccess, Error>;
};