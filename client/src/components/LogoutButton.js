import React from 'react';

const LogoutButton = () => {
  const logout = () => {
    console.log('logout');
  };

  return (
    <button type='button' className='btn btn-primary' onClick={logout}>
      Logout
    </button>
  );
};

export default LogoutButton;
