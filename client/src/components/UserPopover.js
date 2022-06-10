import React, { useState } from 'react';
import user from '../asset/user.png';
import MyPopover from './Popover';
import RegisterButton from './RegisterButton';
import LoginButton from './LoginButton';
import LogoutButton from './LogoutButton';

const UserPopover = ({ setRegisterSuccess, loggedIn, setLoggedIn }) => {
  console.log(loggedIn);
  const userClick = async () => {
    console.log('userClick');
  };

  // <RegisterButton setRegisterSuccess={setRegisterSuccess}></RegisterButton>
  //     <LoginButton
  //       setRegisterSuccess={setRegisterSuccess}
  //       setLoggedIn={setLoggedIn}
  //     ></LoginButton>

  return (
    <MyPopover icon={user} title='User Popover'>
      {(loggedIn && (
        <>
          <LogoutButton setLoggedIn={setLoggedIn} />
        </>
      )) || (
        <>
          <RegisterButton
            setRegisterSuccess={setRegisterSuccess}
          ></RegisterButton>
          <LoginButton
            setRegisterSuccess={setRegisterSuccess}
            setLoggedIn={setLoggedIn}
          ></LoginButton>
        </>
      )}
    </MyPopover>
  );
};

export default UserPopover;
