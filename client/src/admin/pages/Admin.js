import React, { useContext, useState } from 'react';
import Button from '../../components/Button/Button';
import AuthContext from '../../context/authContext';
import AdminServices from '../../services/AdminServices';
import Navbar from '../containers/Navbar/Navbar';
import NavigationBar from '../containers/NavigationBar/AdminNavigationBar';
import ManageProducts from './ManageProducts';
import ManageCustomers from './ManageCustomers';
import ManageOrders from './ManageOrders';

const Admin = () => {
  const { getIsAdminlsLoggedIn } = useContext(AuthContext);
  const [productsDisplay, setProductsDisplay] = useState(false);
  const [customersDisplay, setCustomersDisplay] = useState(false);
  const [ordersDisplay, setOrdersDisplay] = useState(false);

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
      <NavigationBar
        setProductsDisplay={setProductsDisplay}
        setCustomersDisplay={setCustomersDisplay}
        setOrdersDisplay={setOrdersDisplay}
      />
      {productsDisplay && <ManageProducts></ManageProducts>}
      {customersDisplay && <ManageCustomers></ManageCustomers>}
      {ordersDisplay && <ManageOrders></ManageOrders>}
    </div>
  );
};

export default Admin;
