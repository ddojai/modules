import { createAction, handleActions } from 'redux-actions';

import { Map, fromJS } from 'immutable';
import { pender } from 'redux-pender';
import * as api from 'lib/api';
import { ACCESS_TOKEN } from 'commonConstants';

// action types
const SHOW_MODAL = 'base/SHOW_MODAL';
const HIDE_MODAL = 'base/HIDE_MODAL';
const LOGOUT = 'base/LOGOUT';
const CHECK_LOGIN = 'base/CHECK_LOGIN';
const TEMP_LOGIN = 'base/TEMP_LOGIN';

// action creators
export const showModal = createAction(SHOW_MODAL);
export const hideModal = createAction(HIDE_MODAL);
export const checkLogin = createAction(CHECK_LOGIN, api.getUser);
export const logout = createAction(LOGOUT);
export const tempLogin = createAction(TEMP_LOGIN);


// initial state
const initialState = Map({
  // 모달의 가시성 상태
  modal: Map({
    remove: false,
    login: false  // 추후 구현될 로그인 모달
  }),
  authenticated: false, // 현재 로그인 상태
  currentUser: Map({}),    // 로그인 정보
});

// reducer
export default handleActions({
  [SHOW_MODAL]: (state, action) => {
    const { payload: modalName } = action;
    return state.setIn(['modal', modalName], true);
  },
  [HIDE_MODAL]: (state, action) => {
    const { payload: modalName } = action;
    return state.setIn(['modal', modalName], false);
  },
  ...pender({
    type: CHECK_LOGIN,
    onSuccess: (state, action) => {
      const { data: currentUser } = action.payload;
      return state
        .set('currentUser', fromJS(currentUser))
        .set('authenticated', true)
    },
    onFailure: (state, action) => {
      console.log('onFailure');
      localStorage.removeItem(ACCESS_TOKEN);
      return state
        .set('currentUser', Map({}))
        .set('authenticated', false)
    }
  }),
  [LOGOUT]: (state, action) => {
    localStorage.removeItem(ACCESS_TOKEN);
    return state
      .set('currentUser', Map({}))
      .set('authenticated', false)
  },
  [TEMP_LOGIN]: (state, action) => {
    return state
      .set('authenticated', true)
  }
}, initialState);
