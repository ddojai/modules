import React from 'react';
import { Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import PostListPage from './pages/PostListPage';
import WritePage from './pages/WritePage';
import PostPage from './pages/PostPage';
import OAuth2RedirectPage from 'pages/OAuth2RedirectPage';

function App() {
  return (
    <>
      <Route component={PostListPage} path={['/@:email', '/']} exact />
      <Route component={LoginPage} path="/login" />
      <Route component={SignUpPage} path="/signup" />
      <Route component={WritePage} path="/write" />
      <Route component={PostPage} path="/@:email/:postId" />
      <Route component={OAuth2RedirectPage} path="/oauth2/redirect" />
    </>
  );
}

export default App;
