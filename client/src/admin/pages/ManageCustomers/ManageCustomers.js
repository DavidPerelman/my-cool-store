import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/Button/Button';
import Form from '../../../components/Form';
import Modal from '../../../components/Modal/Modal';
import MyTable from '../../../components/MyTable/MyTable';
import SearchBar from '../../../components/SearchBar/SearchBar';
import TablePagination from '../../../components/TablePagination/TablePagination';
import AuthService from '../../../services/AuthServices';
import CustomersServices from '../../../services/CustomersServices';
import {
  isFormFieldsValid,
  isValidEmail,
  isValidPassword,
} from '../../../utils/formValidation';
import './ManageProducts.css';

const ManageCustomers = () => {
  const navigate = useNavigate();
  const [customers, setCustomers] = useState(null);
  const [tableData, setTableData] = useState(null);
  const [show, setShow] = useState(false);
  const [searchStatus, setSearchStatus] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [paginatedCustomers, setPaginatedCustomers] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [error, setError] = useState('');
  const [newCustomerData, setNewCustomerData] = useState({
    lastName: '',
    firstName: '',
    email: '',
    password: '',
    verifyPassword: '',
  });

  useEffect(() => {
    CustomersServices.fetchAllCustomers().then((data) => {
      setCustomers(data.customers);
      setTableData(data.customers);
      setPaginatedCustomers(data.customers.slice(0, 10));
    });
  }, []);

  const back = async () => {
    navigate(`/admin`);
  };

  const handleFormChange = (e, valKey) => {
    const { value } = e.target;
    setNewCustomerData((prevState) => {
      return { ...prevState, [valKey]: value };
    });
  };

  const handleShow = () => {
    setShow(true);
  };

  const handleClose = () => {
    clearFormFields();
    setShow(false);
  };

  const clearFormFields = () => {
    setNewCustomerData({
      lastName: '',
      firstName: '',
      email: '',
      password: '',
      verifyPassword: '',
    });
  };

  const showError = (error) => {
    setError(error);

    setTimeout(() => {
      setError('');
    }, 3000);
  };

  const addNewCustomer = async () => {
    if (!isFormFieldsValid(newCustomerData))
      return showError('all fields required!');

    if (
      isValidPassword(newCustomerData.password, newCustomerData.verifyPassword)
        .validPassword === false
    )
      return showError(
        'Password must be at least 6 characters long and the passwords must be identical'
      );

    if (!isValidEmail(newCustomerData.email)) return showError('invalid email');

    try {
      const res = await AuthService.registerUser(newCustomerData);
      console.log(res.success === undefined);

      if (res.success === undefined) {
        showError(res);
      } else {
        console.log('success');
        // handleClose();
        // navigate('/confirmRegister');
      }
    } catch (err) {
      console.log(err);
      setError(err);
    }
  };

  const goToOrder = async (productId) => {
    console.log(productId);
    // navigate(`/order/${orderId}`);
  };

  const pageSize = 10;
  const pageCount = customers ? Math.ceil(customers.length / pageSize) : 0;
  const pageCountArray = new Array(pageCount).fill('').map((_, i) => i + 1);

  // if (pageCount === 1) {
  //   return null;
  // }

  const pagination = async (pageNum) => {
    setCurrentPage(pageNum);

    const startIndex = (pageNum - 1) * 10;

    const paginatedProduct = tableData.slice(startIndex, startIndex + 10);

    setPaginatedCustomers(paginatedProduct);
  };

  const renderHeader = () => {
    let headerData = [
      'No.',
      'Full Name',
      'Email',
      'Register Date',
      'Role',
      'Verified',
    ];

    return headerData.map((key, i) => {
      {
        return (
          <th key={i} id={`${key}-th`}>
            {key}
          </th>
        );
      }
    });
  };

  const renderBody = () => {
    return (
      (searchStatus &&
        tableData
          .filter(
            (customer) =>
              customer.fullName.toLowerCase().includes(searchQuery) ||
              customer.email.toLowerCase().includes(searchQuery) ||
              customer.role.toLowerCase().includes(searchQuery)
          )
          .map((customer, i) => {
            return (
              <tr
                key={i}
                className='row-data'
                onClick={() => {
                  goToOrder(customer._id);
                }}
              >
                <td>{i + 1}</td>
                <td>{customer.fullName}</td>
                <td>{customer.email}</td>
                <td>{customer.registerDate}</td>
                <td>{customer.role}</td>
                <td>{customer.verified.toString()}</td>
              </tr>
            );
          })) ||
      (paginatedCustomers &&
        paginatedCustomers
          .filter(
            (customer) =>
              customer.fullName.toLowerCase().includes(searchQuery) ||
              customer.email.toLowerCase().includes(searchQuery) ||
              customer.role.toLowerCase().includes(searchQuery)
          )
          .map((customer, i) => {
            return (
              <tr
                key={i}
                className='row-data'
                onClick={() => {
                  goToOrder(customer._id);
                }}
              >
                <td>{i + 1}</td>
                <td>{customer.fullName}</td>
                <td>{customer.email}</td>
                <td>{customer.registerDate}</td>
                <td>{customer.role}</td>
                <td>{customer.verified.toString()}</td>
              </tr>
            );
          }))
    );
  };

  return (
    <div>
      <h1>Manage Customers</h1>
      <div className='controllers'>
        <div className='controllers-buttons'>
          <Button onClick={back} className='ManageCustomers-back-button'>
            Back
          </Button>
          <Button onClick={handleShow} className='new-customer-button'>
            New Customer
          </Button>
        </div>
        <SearchBar
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          setSearchStatus={setSearchStatus}
          searchStatus={searchStatus}
        />
      </div>

      <div className='customers-table'>
        <MyTable renderHeader={renderHeader} renderBody={renderBody}></MyTable>
        {searchStatus === false && (
          <TablePagination
            pages={pageCountArray}
            currentPage={currentPage}
            onClick={pagination}
          />
        )}
      </div>

      {show && (
        <Modal
          show={show}
          onClose={handleClose}
          title='Add New Product'
          textButton='Add'
          onSubmit={addNewCustomer}
          error={error}
        >
          <Form
            data={newCustomerData}
            handleFormChange={handleFormChange}
          ></Form>
          <div className='modal-footer'>
            <Button
              size='user-modal-button'
              color='button--close'
              onClick={handleClose}
            >
              Close
            </Button>
            <Button size='user-modal-button' onClick={addNewCustomer}>
              Add
            </Button>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default ManageCustomers;
