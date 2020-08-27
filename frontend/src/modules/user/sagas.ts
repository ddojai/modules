import {
  userAsync,
  USER_ME,
  USER_ME_ERROR,
  LOGOUT,
  GO_TO_HOME,
} from './actions';
import { userMe } from 'api/user';
import { takeEvery, getContext } from 'redux-saga/effects';
import createAsyncSaga from 'lib/createAsyncSaga';

const asyncUserSaga = createAsyncSaga(userAsync, userMe);

export function userMeErrorSaga() {
  try {
    localStorage.removeItem('user');
    localStorage.removeItem('accessToken');
  } catch (e) {
    console.log('localStorage is not working');
  }
}

export function logoutSaga() {
  try {
    // todo : logout api call
    localStorage.removeItem('user');
    localStorage.removeItem('accessToken');
  } catch (e) {
    console.log(e);
  }
}

export function* goToHomeSaga() {
  const history = yield getContext('history');
  history.push('/');
}

export function* userSaga() {
  yield takeEvery(USER_ME, asyncUserSaga);
  yield takeEvery(USER_ME_ERROR, userMeErrorSaga);
  yield takeEvery(LOGOUT, logoutSaga);
  yield takeEvery(GO_TO_HOME, goToHomeSaga);
}
