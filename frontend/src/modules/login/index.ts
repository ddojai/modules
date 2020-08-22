import { createAction, ActionType, createReducer } from 'typesafe-actions';

// 액션 type
const CHANGE_FILED = 'login/CHANGE_FILED';
const INITIALIZE_FORM = 'login/INITIALIZE_FORM';

// 액션 생성 함수
export const changeField = createAction(CHANGE_FILED, ({ key, value }) => ({
  key, // username, password
  value, // 실제 바꾸려는 값
}))();
export const initializeForm = createAction(INITIALIZE_FORM)();

// 액션들의 타입스크립트 타입 준비
const actions = { changeField, initializeForm };
type LoginAction = ActionType<typeof actions>;

// 상태를 위한 타입 선언
type LoginState = {
  username: string;
  password: string;
};
const initialState: LoginState = {
  username: '',
  password: '',
};

const login = createReducer<LoginState, LoginAction>(initialState, {
  [INITIALIZE_FORM]: () => initialState,
  [CHANGE_FILED]: (state, { payload: { key, value } }) => ({
    ...state,
    [key]: value,
  }),
});

export default login;
