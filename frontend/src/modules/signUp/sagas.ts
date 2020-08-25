import { signUpAsync, SIGN_UP } from './actions';
import { signUp } from 'api/signUp';
import { takeEvery } from 'redux-saga/effects';
import createAsyncSaga from 'lib/createAsyncSaga';

const asyncSignUpSaga = createAsyncSaga(signUpAsync, signUp);

export function* signUpSaga() {
  yield takeEvery(SIGN_UP, asyncSignUpSaga);
}
