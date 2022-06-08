import React, { useState } from 'react';
import Button from './Button';
import axios from 'axios';

const LogoutButton = ({ setLoggedIn }) => {
  const [error, setError] = useState('');

  const logout = async () => {
    try {
      let res = await axios.get('/user/logout');
      setLoggedIn(false);
      console.log(res);
    } catch (err) {
      console.log(err.response.data.errMessage);
      setError(err.response.data.errMessage);
    }
  };

  return (
    <Button type='button' className='btn btn-primary' onClick={logout}>
      Logout
    </Button>
  );
};

export default LogoutButton;
