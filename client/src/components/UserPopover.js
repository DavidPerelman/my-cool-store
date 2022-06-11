import React, { useState } from 'react';
import user from '../asset/user.png';
import MyPopover from './Popover';
import RegisterButton from './RegisterButton';
import LoginButton from './LoginButton';
import LogoutButton from './LogoutButton';

const UserPopover = ({ setRegisterSuccess, loggedIn }) => {
  return (
    <MyPopover icon={user} title='User Popover'>
      {(loggedIn && (
        <>
          <LogoutButton loggedIn={loggedIn} />
        </>
      )) || (
        <>
          <RegisterButton
            setRegisterSuccess={setRegisterSuccess}
          ></RegisterButton>
          <LoginButton
            setRegisterSuccess={setRegisterSuccess}
            loggedIn={loggedIn}
          ></LoginButton>
        </>
      )}
    </MyPopover>
  );
};

export default UserPopover;
