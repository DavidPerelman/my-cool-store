import AuthContext from '../context/authContext';
import AdminServices from '../services/AdminServices';

const logout = async () => {
  try {
    console.log('logout');
    const res = await AdminServices.logout();
  } catch (err) {
    console.log(err);
  }
};

export { logout };
