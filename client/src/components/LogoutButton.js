import React, { useState } from 'react';
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

  return (
    <Button type='button' className='btn btn-primary' onClick={logout}>
      Logout
    </Button>
  );
};

export default LogoutButton;
