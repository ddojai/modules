import React from 'react';
import { Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import PostListPage from './pages/PostListPage';
import WritePage from './pages/WritePage';
import PostPage from './pages/PostPage';

function App() {
  return (
    <>
      <Route component={PostListPage} path={['/@:email', '/']} exact />
      <Route component={LoginPage} path="/login" />
      <Route component={SignUpPage} path="/signup" />
      <Route component={WritePage} path="/write" />
      <Route component={PostPage} path="/@:email/:postId" />
    </>
  );
}

export default App;
