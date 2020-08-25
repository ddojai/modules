import { userAsync, USER_ME, GO_TO_HOME } from './actions';
import { userMe } from 'api/user';
import { takeEvery, getContext } from 'redux-saga/effects';
import createAsyncSaga from 'lib/createAsyncSaga';

const asyncUserSaga = createAsyncSaga(userAsync, userMe);

export function* goToHomeSaga() {
  const history = yield getContext('history');
  history.push('/');
}

export function* userSaga() {
  yield takeEvery(USER_ME, asyncUserSaga);
  yield takeEvery(GO_TO_HOME, goToHomeSaga)
}