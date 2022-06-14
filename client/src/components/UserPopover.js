import React from 'react';
import user from '../asset/user.png';
import MyPopover from './MyPopover';
import RegisterButton from './RegisterButton';
import LoginButton from './LoginButton';
import LogoutButton from './LogoutButton';

const UserPopover = ({ setRegisterSuccess, loggedIn, userData }) => {
  const guest = userData === undefined;

  return (
    <MyPopover icon={user} title={guest ? 'Guest' : userData.firstName}>
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
