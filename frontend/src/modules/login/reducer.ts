import { createReducer } from 'typesafe-actions';
import { LoginState, LoginAction } from './types';
import { LOGIN, LOGIN_SUCCESS, LOGIN_ERROR } from './actions';

const initialState: LoginState = {
  loginResponse: {
    loading: false,
    error: null,
    data: null,
  },
};

const login = createReducer<LoginState, LoginAction>(initialState, {
  [LOGIN]: (state) => ({
    ...state,
    loginResponse: {
      loading: true,
      error: null,
      data: null,
    },
  }),
  [LOGIN_SUCCESS]: (state, action) => ({
    ...state,
    loginResponse: {
      loading: false,
      error: null,
      data: action.payload,
    },
  }),
  [LOGIN_ERROR]: (state, action) => ({
    ...state,
    loginResponse: {
      loading: false,
      error: action.payload,
      data: null,
    },
  }),
});

export default login;
