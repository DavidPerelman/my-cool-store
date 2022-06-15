import React from 'react';
import user from '../asset/user.png';
import MyPopover from '../components/MyPopover/MyPopover';
import RegisterButton from './RegisterButton';
import LoginButton from './LoginButton';
import LogoutButton from './LogoutButton';

const UserPopover = ({ setRegisterSuccess, loggedIn, userData }) => {
  return (
    <MyPopover
      icon={user}
      title={loggedIn ? userData.firstName : 'Guest'}
      userData={userData}
      loggedIn={loggedIn}
    >
      {(loggedIn && (
        <>
          <LogoutButton loggedIn={loggedIn} />
        </>
      )) || (
        <>
          <RegisterButton
            loggedIn={loggedIn}
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
