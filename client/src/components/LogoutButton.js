import React, { useState, useEffect } from 'react';
import Button from './Button';
import AuthService from '../services/AuthServices';

const LogoutButton = ({ setLoggedIn }) => {
  const logout = async () => {
    try {
      const res = await AuthService.logout();
      setLoggedIn(false);
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };

  const buttonStyle = {
    backgroundColor: 'blue',
    border: 'none',
    color: 'white',
    padding: '6px',
    textAlign: 'center',
    textDecoration: 'none',
    display: 'inline-block',
    fontSize: '16px',
    borderRadius: '6px',
    width: '90%',
    marginTop: '5px',
  };

  useEffect(() => {
    document
      .getElementsByClassName('wrapper')[1]
      .lastChild.classList.remove('keep-show-modal');
  }, []);

  return (
    <Button
      type='button'
      style={buttonStyle}
      className='btn btn-primary'
      onClick={logout}
    >
      Logout
    </Button>
  );
};

export default LogoutButton;
