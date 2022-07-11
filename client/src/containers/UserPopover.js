import React from 'react';
import user from '../asset/user.png';
import MyPopover from '../components/MyPopover/MyPopover';
import RegisterButton from './RegisterButton';
import LoginButton from './LoginButton';
import LogoutConatiner from './LogoutConatiner';

const UserPopover = ({ setRegisterSuccess, loggedIn, userData }) => {
  return (
    <MyPopover
      type='user'
      icon={user}
      title={loggedIn ? userData.firstName : 'Guest'}
      userData={userData}
      loggedIn={loggedIn}
    >
      {(loggedIn && (
        <>
          <LogoutConatiner loggedIn={loggedIn} />
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
