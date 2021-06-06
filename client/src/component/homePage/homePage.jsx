import React, { useEffect, useState } from 'react';
import Cookies from 'universal-cookie';

import { Header } from './header/header';

export const HomePage = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const cookies = new Cookies();
    const fetchUser = async () => {
      // const userRaw = await fetch('api/user?token=234234234');
      const userRaw = cookies.get('token');

      setUser(userRaw);
      console.log(user);
    };

    fetchUser();
  }, []);

  return (
    <>
      <div>
        <Header />
      </div>
    </>
  );
};
