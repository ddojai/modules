import { createReducer } from 'typesafe-actions';
import { SignUpState, SignUpAction } from './types';
import { INITIALIZE_FORM, CHANGE_FILED } from './actions';

const initialState: SignUpState = {
  name: '',
  email: '',
  password: '',
  passwordConfirm: '',
};

const signUp = createReducer<SignUpState, SignUpAction>(initialState, {
  [INITIALIZE_FORM]: () => initialState,
  [CHANGE_FILED]: (state, { payload: { key, value } }) => ({
    ...state,
    [key]: value,
  }),
});

export default signUp;
