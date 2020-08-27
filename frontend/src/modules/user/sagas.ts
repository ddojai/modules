import {
  userAsync,
  USER_ME,
  USER_ME_ERROR,
  LOGOUT,
  GO_TO_HOME,
  GO_TO_LOGIN,
} from './actions';
import { userMe } from 'api/user';
import { takeEvery, getContext } from 'redux-saga/effects';
import createAsyncSaga from 'lib/createAsyncSaga';
import { ACCESS_TOKEN } from 'constant';

const asyncUserSaga = createAsyncSaga(userAsync, userMe);

export function userMeErrorSaga() {
  try {
    localStorage.removeItem(ACCESS_TOKEN);
  } catch (e) {
    console.log('localStorage is not working');
  }
}

export function logoutSaga() {
  try {
    // todo : logout api call
    localStorage.removeItem(ACCESS_TOKEN);
  } catch (e) {
    console.log(e);
  }
}

export function* goToHomeSaga() {
  const history = yield getContext('history');
  history.push('/');
}

export function* goToLoginSaga() {
  const history = yield getContext('history');
  history.push('/login');
}

export function* userSaga() {
  yield takeEvery(USER_ME, asyncUserSaga);
  yield takeEvery(USER_ME_ERROR, userMeErrorSaga);
  yield takeEvery(LOGOUT, logoutSaga);
  yield takeEvery(GO_TO_HOME, goToHomeSaga);
  yield takeEvery(GO_TO_LOGIN, goToLoginSaga);
}
