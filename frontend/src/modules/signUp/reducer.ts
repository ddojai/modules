import { createReducer } from 'typesafe-actions';
import { SignUpState, SignUpAction } from './types';
import { SIGN_UP, SIGN_UP_SUCCESS, SIGN_UP_ERROR } from './actions';

const initialState: SignUpState = {
  signUpResponse: {
    loading: false,
    error: null,
    data: null,
  },
};

const signUp = createReducer<SignUpState, SignUpAction>(initialState, {
  [SIGN_UP]: (state) => ({
    ...state,
    signUpResponse: {
      loading: true,
      error: null,
      data: null,
    },
  }),
  [SIGN_UP_SUCCESS]: (state, action) => ({
    ...state,
    signUpResponse: {
      loading: false,
      error: null,
      data: action.payload,
    },
  }),
  [SIGN_UP_ERROR]: (state, action) => ({
    ...state,
    signUpResponse: {
      loading: false,
      error: action.payload,
      data: null,
    },
  }),
});

export default signUp;
