import React, { useContext } from 'react';
import Content from '../components/Content/Content';
import LoginConatiner from '../containers/LoginConatiner/LoginConatiner';
import RegisterContainer from '../containers/RegisterContainer';
import AuthContext from '../context/authContext';

const Home = () => {
  const { loginModalOpen, registerModalOpen } = useContext(AuthContext);

  return (
    <>
      <div>
        <Content></Content>
        {loginModalOpen && <LoginConatiner></LoginConatiner>}
        {registerModalOpen && <RegisterContainer></RegisterContainer>}
      </div>
    </>
  );
};

export default Home;
