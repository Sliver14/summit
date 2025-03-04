import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  const isLoggedIn = !!localStorage.getItem('token'); // Check if token exists

  return isLoggedIn ? children : <Navigate to="/signin" />;
};

export default PrivateRoute;

// import React from 'react';
// import { Navigate } from 'react-router-dom';
// import jwtDecode from 'jwt-decode';

// const PrivateRoute = ({ children }) => {
//   const token = localStorage.getItem('token');

//   const isTokenValid = () => {
//     if (!token) return false;
//     try {
//       const decoded = jwtDecode(token);
//       return decoded.exp > Date.now() / 1000; // Check expiration
//     } catch {
//       return false;
//     }
//   };

//   return isTokenValid() ? children : <Navigate to="/signin" />;
// };

// export default PrivateRoute;