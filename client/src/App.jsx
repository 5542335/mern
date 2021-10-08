import React, { useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { useDispatch, useSelector } from 'react-redux';

import { AuthForm } from './component/authForm/AuthPage';
import { HomePage } from './component/homePage/homePage';
import { SignupForm } from './component/registerForm/RegisterPage';
import { Profile } from './component/profile/profile';
import { Header } from './component/header/header';
import { Repository } from './component/repository/Repository';
import { Collections } from './component/collections/Collections';
import { Admin } from './component/admin/Admin';

import './index.css';

const history = createBrowserHistory();

const App = () => {
  const dispatch = useDispatch();
  const tokenStore = useSelector((state) => state.token);

  useEffect(() => {
    if (tokenStore) {
      const fetchUser = async () => {
        const userRaw = await fetch(`api/user?token=${tokenStore}`);
        const formatUser = await userRaw.json();

        dispatch({ payload: formatUser, type: 'user' });
      };

      fetchUser();
    }
  }, [tokenStore]);

  return (
    <>
      <Router history={history}>
        <Header />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/register" component={SignupForm} />
          <Route path="/auth" component={AuthForm} />
          <Route path="/profile" component={Profile} />
          <Route path="/:repositoryOwner/:repositoryName" component={Repository} />
          <Route path="/collections" component={Collections} />
          <Route path="/admin" component={Admin} />
        </Switch>
      </Router>
    </>
  );
};

export default App;
