import React, { useContext, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import AuthContext from './context/authContext';

const Router = () => {
  const { loggedIn, setLoggedIn, userData } = useContext(AuthContext);
  console.log(userData);

  return (
    <div>
      <Routes>
        {loggedIn === false && (
          <>
            <Route
              exact
              path='/'
              element={
                <Home
                  loggedIn={loggedIn}
                  setLoggedIn={setLoggedIn}
                  userData={userData}
                />
              }
            />
            <Route
              path='/:status/:userName'
              element={
                <Home
                  loggedIn={loggedIn}
                  setLoggedIn={setLoggedIn}
                  userData={userData}
                />
              }
            />
          </>
        )}
        {loggedIn === true && (
          <>
            <Route
              exact
              path='/'
              element={
                <Home
                  loggedIn={loggedIn}
                  setLoggedIn={setLoggedIn}
                  userData={userData}
                />
              }
            />
            <Route
              path='/:status/:userName'
              element={
                <Home
                  loggedIn={loggedIn}
                  setLoggedIn={setLoggedIn}
                  userData={userData}
                />
              }
            />
          </>
        )}
      </Routes>
    </div>
  );
};

export default Router;
