import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

export const Admin = () => {
  const [user, setUser] = useState();
  const tokenStore = useSelector((state) => state.token);

  useEffect(() => {
    const fetchUser = async () => {
      const userRaw = await fetch(`api/user/admin?token=${tokenStore}`);
      const formatUser = await userRaw.json();

      setUser(formatUser);
    };

    fetchUser();
  }, [tokenStore]);

  return <div>{user?.role.map((item) => item)}</div>;
};
