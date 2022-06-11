import { createContext, useEffect, useState } from 'react';
import axios from 'axios';

const AuthContext = createContext();

const AuthContextProvider = (props) => {
  const [loggedIn, setLoggedIn] = useState(undefined);
  const [userData, setUserData] = useState(undefined);

  const getLoggedIn = async () => {
    const loggedInRes = await axios.get('http://localhost:5000/user/loggedIn');
    console.log(loggedInRes);
    setLoggedIn(loggedInRes.loggedIn);
    setUserData(loggedInRes.user);
  };

  useEffect(() => {
    getLoggedIn();
  }, []);

  return (
    <AuthContext.Provider value={{ loggedIn, getLoggedIn, userData }}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
export { AuthContextProvider };
