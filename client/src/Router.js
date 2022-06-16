import React, { useContext, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import AuthContext from './context/authContext';
import Navbar from './components/Navbar/Navbar';

const Router = () => {
  const { loggedIn, setLoggedIn, userData } = useContext(AuthContext);
  // console.log(userData);
  const [registerSuccess, setRegisterSuccess] = useState(false);

  return (
    <div>
      <Routes>
        {loggedIn === undefined && (
          <>
            {/* <Navbar
              loggedIn={loggedIn}
              setRegisterSuccess={setRegisterSuccess}
              userData={userData}
            ></Navbar> */}
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
