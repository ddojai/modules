import { createReducer } from 'typesafe-actions';
import { LoginState, LoginAction } from './types';
import { INITIALIZE_FORM, CHANGE_FILED } from './actions';

const initialState: LoginState = {
  email: '',
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
