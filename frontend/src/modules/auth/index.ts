import { createAction, ActionType, createReducer } from 'typesafe-actions';
import produce from 'immer';

// 액션 type
const CHANGE_FILED = 'auth/CHANGE_FILED';
const INITIALIZE_FORM = 'auth/INITIALIZE_FORM';
// const INCREASE = 'counter/INCREASE';
// const DECREASE = 'counter/DECREASE';
// const INCREASE_BY = 'counter/INCREASE_BY';

// 액션 생성 함수
export const changeField = createAction(
  CHANGE_FILED,
  ({ form, key, value }) => ({
    form, // register, login
    key, // username, password, passwordConfirm
    value, // 실제 바꾸려는 값
  })
)();
export const initializeForm = createAction(INITIALIZE_FORM, (form) => form)(); // register / login
// export const increase = createStandardAction(INCREASE)();
// () => ({ type: INCREASE })
// export const decrease = createStandardAction(DECREASE)();
// () => ({ type: DECREASE })
// export const increaseBy = createStandardAction(INCREASE_BY)<number>();
// (payload: number) => ({ type: INCREASE_BY, payload })
// const createItem = createStandardAction(CREATE_ITEM).map(name => ({ payload: { id: nanoid(), name } }));
// const createItem = (name: string) => ({ type: CREATE_ITEM, payload: { id: nanoid(), name } });

// 액션들의 타입스크립트 타입 준비
const actions = { changeField, initializeForm };
type AuthAction = ActionType<typeof actions>;
// const actions = { increase, decrease, increaseBy };
// type CounterAction = ActionType<typeof actions>;

// 상태를 위한 타입 선언
type AuthState = {
  register: {
    username: string;
    password: string;
    passwordConfirm: string;
  };
  login: {
    username: string;
    password: string;
  };
};
const initialState: AuthState = {
  register: {
    username: '',
    password: '',
    passwordConfirm: '',
  },
  login: {
    username: '',
    password: '',
  },
};
// type CounterState = {
//   count: number;
// };
// const initialState: CounterState = {
//   count: 0
// };

const auth = createReducer<AuthState, AuthAction>(initialState, {
  [INITIALIZE_FORM]: (state, { payload: form }) => ({
    ...state,
    [form]: initialState[form],
  }),
  [CHANGE_FILED]: (state, { payload: { form, key, value } }) =>
    produce(state, (draft) => {
      draft[form][key] = value;
    }),
});
// const counter = createReducer<CounterState, CounterAction>(initialState, {
//   [INCREASE]: state => ({ count: state.count + 1 }),
//   [DECREASE]: state => ({ count: state.count - 1 }),
//   [INCREASE_BY]: (state, action) => ({ count: state.count + action.payload })
// });

export default auth;
