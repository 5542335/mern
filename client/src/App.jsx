import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import { AuthForm } from './component/authForm/AuthPage';
import { HomePage } from './component/homePage/homePage';
import { SignupForm } from './component/registerForm/RegisterPage';

import './index.css';

const App = () => (
  <Router>
    <Switch>
      <Route exact path="/" component={HomePage} />
      <Route path="/register" component={SignupForm} />
      <Route path="/auth" component={AuthForm} />
    </Switch>
  </Router>
);

export default App;
