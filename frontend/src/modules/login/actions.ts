import { createAction } from 'typesafe-actions';

// 액션 type
export const CHANGE_FILED = 'login/CHANGE_FILED';
export const INITIALIZE_FORM = 'login/INITIALIZE_FORM';

// 액션 생성 함수
export const changeField = createAction(CHANGE_FILED, ({ key, value }) => ({
  key, // email, password
  value, // 실제 바꾸려는 값
}))();
export const initializeForm = createAction(INITIALIZE_FORM)();