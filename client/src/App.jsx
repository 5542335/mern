import React, { useCallback, useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import Cookies from 'universal-cookie';

import { AuthForm } from './component/authForm/AuthPage';
import { HomePage } from './component/homePage/homePage';
import { SignupForm } from './component/registerForm/RegisterPage';
import { Profile } from './component/profile/profile';
import { Header } from './component/header/header';
import { Repository } from './component/repository/Repository';

import './index.css';

const history = createBrowserHistory();

const App = () => {
  const cookies = new Cookies();
  const [token, setToken] = useState(cookies.get('token'));
  const AuthPage = useCallback(() => <AuthForm setToken={setToken} />, []);

  return (
    <>
      <Router history={history}>
        <Header token={token} setToken={setToken} />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/register" component={SignupForm} />
          <Route path="/auth" component={AuthPage} />
          <Route path="/profile" component={Profile} />
          <Route path="/:repositoryOwner/:repositoryName" component={Repository} />
        </Switch>
      </Router>
    </>
  );
};

export default App;
