// import React, { useEffect, useState } from 'react';
// import { NavLink } from 'react-router-dom';

// export const HomePage = () => {
//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     const fetchUser = async () => {
//       const userRaw = await fetch('api/user?token=234234234');

//       setUser(userRaw);
//       console.log(user);
//     };

//     fetchUser();
//   }, []);

//   return (
//     <>
//       <div>
//         <h1>Home page</h1>
//         <div>
//           <NavLink to="/register">Регистрация</NavLink>
//         </div>
//         <div>
//           <NavLink to="/auth">Авторизация</NavLink>
//         </div>
//       </div>
//     </>
//   );
// };
