import React, { useContext } from 'react';
import Button from '../../components/Button/Button';
import LogoutConatiner from '../../containers/LogoutConatiner';
import AuthContext from '../../context/authContext';
import AdminServices from '../../services/AdminServices';
import Navbar from '../containers/Navbar/Navbar';

const Admin = () => {
  const { getIsAdminlsLoggedIn } = useContext(AuthContext);

  const logout = async () => {
    try {
      const res = await AdminServices.logout();
      await getIsAdminlsLoggedIn();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <Navbar logout={logout}></Navbar>
      <Button size='user-modal-button' onClick={logout}>
        Logout
      </Button>
    </div>
  );
};

export default Admin;
