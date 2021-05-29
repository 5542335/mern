import React from 'react';
import { NavLink } from 'react-router-dom';

export const HomePage = () => (
  <div>
    <h1>Home page</h1>
    <div>
      <NavLink to="/register">Регистрация</NavLink>
    </div>
    <div>
      <NavLink to="/auth">Авторизация</NavLink>
    </div>
  </div>
);
