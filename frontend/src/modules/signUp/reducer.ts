import { createReducer } from 'typesafe-actions';
import { SignUpState, SignUpAction } from './types';
import { SIGN_UP, SIGN_UP_SUCCESS, SIGN_UP_ERROR } from './actions';
import { asyncState } from 'lib/reducerUtils';

const initialState: SignUpState = {
  signUpResponse: asyncState.initial(),
};

const signUp = createReducer<SignUpState, SignUpAction>(initialState, {
  [SIGN_UP]: (state) => ({
    ...state,
    signUpResponse: asyncState.load(),
  }),
  [SIGN_UP_SUCCESS]: (state, action) => ({
    ...state,
    signUpResponse: asyncState.success(action.payload),
  }),
  [SIGN_UP_ERROR]: (state, action) => ({
    ...state,
    signUpResponse: asyncState.error(action.payload),
  }),
});

export default signUp;
