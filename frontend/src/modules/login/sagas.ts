import { loginAsync, LOGIN } from './actions';
import { login } from 'api/login';
import { takeEvery } from 'redux-saga/effects';
import createAsyncSaga from 'lib/createAsyncSaga';

const asyncLoginSaga = createAsyncSaga(loginAsync, login);

export function* loginSaga() {
  yield takeEvery(LOGIN, asyncLoginSaga);
}
