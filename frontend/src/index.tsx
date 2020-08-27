import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';
import rootReducer, { rootSaga } from './modules';
import { createBrowserHistory } from 'history';
import { userAsync } from 'modules/user';
import { ACCESS_TOKEN } from 'constant';

const customHistory = createBrowserHistory();
const sagaMiddleware = createSagaMiddleware({
  context: {
    history: customHistory,
  },
});

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(sagaMiddleware))
);

function loadUser() {
  // App 컴포넌트에서 처리할 경우 컴포넌트가 한번 렌더링 된 이후에 실행
  // 깜박임 현상이 생길 수 있음
  try {
    const accessToken = localStorage.getItem(ACCESS_TOKEN);
    // 로그인 상태가 아니라면 아무것도 안함
    if (!accessToken) return;
    // 정말 로그인 상태인지 검증
    store.dispatch(userAsync.request(accessToken));
  } catch (e) {
    console.log('localStorage is not working');
  }
}

sagaMiddleware.run(rootSaga);
// sagaMiddleware.run 호출 이후에 호출.
// 먼저 호출하면 userMe 제대로 처리 안됨
loadUser();

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router history={customHistory}>
        <App />
      </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
