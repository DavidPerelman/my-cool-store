import React, { useContext, useState } from 'react';
import Button from '../../../components/Button/Button';
import AuthContext from '../../../context/authContext';
import AdminServices from '../../../services/AdminServices';
import { useNavigate } from 'react-router-dom';
import './Admin.css';

const Admin = () => {
  const navigate = useNavigate();

  const { getIsAdminlsLoggedIn } = useContext(AuthContext);

  const logout = async () => {
    try {
      console.log('logout');
      const res = await AdminServices.logout();
      await getIsAdminlsLoggedIn();
    } catch (err) {
      console.log(err);
    }
  };

  const manageProducts = async () => {
    navigate(`/admin/manage-products`);
  };

  const manageCustomers = async () => {
    navigate(`/admin/manage-customers`);
  };

  const manageOrders = async () => {
    navigate(`/admin/manage-orders`);
  };

  return (
    <div className='admin-controllers'>
      <Button onClick={manageProducts}>Manage Products</Button>
      <Button onClick={manageCustomers}>Manage Customers</Button>
      <Button onClick={manageOrders}>Manage Orders</Button>
    </div>
  );
};

export default Admin;
