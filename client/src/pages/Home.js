import React, { useContext } from 'react';
import Content from '../components/Content/Content';
import Navbar from '../components/Navbar/Navbar';
import LoginConatiner from '../containers/LoginConatiner/LoginConatiner';
import RegisterContainer from '../containers/RegisterContainer';
import AuthContext from '../context/authContext';

const Home = () => {
  const { loginModalOpen, registerModalOpen, userData, loggedIn } =
    useContext(AuthContext);

  return (
    <>
      <Navbar sticky='top' loggedIn={loggedIn} userData={userData}></Navbar>
      <div>
        <Content></Content>
        {loginModalOpen && <LoginConatiner></LoginConatiner>}
        {registerModalOpen && <RegisterContainer></RegisterContainer>}
      </div>
    </>
  );
};

export default Home;
