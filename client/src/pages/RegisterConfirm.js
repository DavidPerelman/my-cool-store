import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button/Button';

const RegisterConfirm = () => {
  const navigate = useNavigate();

  const home = () => {
    navigate('/');
  };

  return (
    <div style={{ marginTop: '20px' }}>
      <h1>Register Success!</h1>
      <p>
        For registration confirmation please click on the link that we sent to
        email you signed up with him.
      </p>
      <div style={{ marginTop: '20px' }}>
        <Button onClick={home} size={'my-orders-button'}>
          Home
        </Button>
      </div>
    </div>
  );
};

export default RegisterConfirm;
