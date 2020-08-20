import React from 'react';
import { Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';

function App() {
  return (
    <>
      <Route component={LoginPage} path="/login" />
      <Route component={SignUpPage} path="/signUp" />
    </>
  );
}

export default App;
