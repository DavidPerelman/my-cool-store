import React, { useState } from 'react';
import user from '../asset/user.png';
import MyPopover from './Popover';
import RegisterButton from './RegisterButton';
import LoginButton from './LoginButton';

const UserPopover = ({ setRegisterSuccess, loggedIn, setLoggedIn }) => {
  const userClick = async () => {
    console.log('userClick');
  };

  return (
    <MyPopover icon={user} title='User Popover'>
      <RegisterButton setRegisterSuccess={setRegisterSuccess}></RegisterButton>
      <LoginButton setRegisterSuccess={setRegisterSuccess}></LoginButton>
    </MyPopover>
  );
};

export default UserPopover;
