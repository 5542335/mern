import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { createBrowserHistory } from 'history';

import { AuthForm } from './component/authForm/AuthPage';
import { HomePage } from './component/homePage/homePage';
import { SignupForm } from './component/registerForm/RegisterPage';
import { Profile } from './component/profile/profile';
import { Header } from './component/homePage/header/header';

import './index.css';

const history = createBrowserHistory();

const App = () => (
  <>
    <Router history={history}>
      <Header />
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/register" component={SignupForm} />
        <Route path="/auth" component={AuthForm} />
        <Route path="/profile" component={Profile} />
      </Switch>
    </Router>
  </>
);

export default App;
