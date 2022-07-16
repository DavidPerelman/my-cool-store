import React, { useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Button from '../components/Button/Button';
import LoginConatiner from '../containers/LoginConatiner/LoginConatiner';
import AuthContext from '../context/authContext';

const RegisterSuccess = () => {
  const navigate = useNavigate();
  const { userName } = useParams();
  const { loginModalOpen, setLoginModalOpen } = useContext(AuthContext);

  const home = () => {
    navigate('/');
  };

  const login = () => {
    setLoginModalOpen(true);
  };

  return (
    <div>
      <h1>Register Success!</h1>
      <p>Thank you {userName} for subscribing to our site!</p>
      <div style={{ marginTop: '20px' }}>
        <Button onClick={home} size={'my-orders-button'}>
          Home
        </Button>
        <Button onClick={login} size={'my-orders-button'}>
          Login
        </Button>
      </div>
      {loginModalOpen && <LoginConatiner redirect={true}></LoginConatiner>}
    </div>
  );
};

export default RegisterSuccess;
