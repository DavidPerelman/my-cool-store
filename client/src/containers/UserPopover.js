import React from 'react';
import user from '../asset/user.png';
import MyPopover from '../components/MyPopover/MyPopover';
import RegisterButton from './RegisterButton';
import LoginConatiner from './LoginConatiner/LoginConatiner';
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
          <LoginConatiner
            setRegisterSuccess={setRegisterSuccess}
            loggedIn={loggedIn}
          ></LoginConatiner>
        </>
      )}
    </MyPopover>
  );
};

export default UserPopover;
