import { createContext, useEffect, useState } from 'react';
import axios from 'axios';

const AuthContext = createContext();

const AuthContextProvider = (props) => {
  const [loggedIn, setLoggedIn] = useState(undefined);
  const [isAdminlLoggedIn, setIsAdminlLoggedIn] = useState(undefined);
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [registerModalOpen, setRegisterModalOpen] = useState(false);
  const [userData, setUserData] = useState(undefined);

  const getLoggedIn = async () => {
    const loggedInRes = await axios.get(
      `${process.env.REACT_APP_API_URL}/user/checkIfSomebodyLoggedIn`
    );

    setLoggedIn(loggedInRes.data.loggedIn);
    setUserData(loggedInRes.data.user);
  };

  const getIsAdminlsLoggedIn = async () => {
    const adminlLoggedInRes = await axios.get(
      `${process.env.REACT_APP_API_URL}/admin/checkIfAdminLoggedIn`
    );

    setIsAdminlLoggedIn(adminlLoggedInRes.data.isAdmin);
    setUserData(adminlLoggedInRes.data.user);
  };

  useEffect(() => {
    getLoggedIn();
    getIsAdminlsLoggedIn();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        loggedIn,
        setLoggedIn,
        isAdminlLoggedIn,
        setIsAdminlLoggedIn,
        getIsAdminlsLoggedIn,
        getLoggedIn,
        userData,
        loginModalOpen,
        setLoginModalOpen,
        registerModalOpen,
        setRegisterModalOpen,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
export { AuthContextProvider };
