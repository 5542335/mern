import React, { useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { AuthForm } from './component/authForm/AuthPage';
import { HomePage } from './component/homePage/homePage';
import { SignupForm } from './component/registerForm/RegisterPage';
import { Profile } from './component/profile/profile';
import { Header } from './component/header/header';
import { Repository } from './component/repository/Repository';
import { Collections } from './component/collections/Collections';
import { Admin } from './component/admin/Admin';
import { updateUserAction } from './store/actions/user';
import { CustomAlert } from './component/shared/alert/CustomAlert';

const App = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state);
  const { openAlert, alertMessage } = useSelector((state) => state.alert);

  useEffect(() => {
    dispatch(updateUserAction);
  }, [dispatch]);

  const isAdmin = !!user && user.role.includes('admin');

  return (
    <>
      <Header />
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/register" component={SignupForm} />
        <Route path="/auth" component={AuthForm} />
        <Route path="/profile" component={Profile} />
        <Route path="/:repositoryOwner/:repositoryName" component={Repository} />
        <Route path="/collections" component={Collections} />
        {isAdmin ? <Route path="/admin" component={Admin} /> : 'not found'}
      </Switch>
      {openAlert && <CustomAlert>{alertMessage}</CustomAlert>}
    </>
  );
};

export default App;
