import { createReducer } from 'typesafe-actions';
import { LoginState, LoginAction } from './types';
import { LOGIN, LOGIN_SUCCESS, LOGIN_ERROR } from './actions';
import { asyncState } from 'lib/reducerUtils';

const initialState: LoginState = {
  loginResponse: asyncState.initial(),
};

const login = createReducer<LoginState, LoginAction>(initialState, {
  [LOGIN]: (state) => ({
    ...state,
    loginResponse: asyncState.load(),
  }),
  [LOGIN_SUCCESS]: (state, action) => ({
    ...state,
    loginResponse: asyncState.success(action.payload),
  }),
  [LOGIN_ERROR]: (state, action) => ({
    ...state,
    loginResponse: asyncState.error(action.payload),
  }),
});

export default login;
