import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/Button/Button';
import MyTable from '../../../components/MyTable/MyTable';
import Popover from '../../../components/Popover/Popover';
import CustomersServices from '../../../services/CustomersServices';
import OrdersServices from '../../../services/OrdersServices';
import ExpandIcon from '../../asset/expand-icon.png';
import './ManageOrders.css';

const ManageOrders = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState(null);
  const [customersNames, setCustomersNames] = useState([]);
  const [customers, setCustomers] = useState(null);
  const [tableData, setTableData] = useState(null);
  const [visibile, setVisibile] = useState(false);

  useEffect(() => {
    OrdersServices.getAllOrders().then((data) => {
      setOrders(data.orders);
      setTableData(data.orders);
    });

    CustomersServices.fetchAllCustomers().then((data) => {
      setCustomers(data.customers);
    });

    if (customers !== null) {
      for (let i = 0; i < customers.length; i++) {
        customersNames.push({
          id: customers[i]._id,
          fullName: `${customers[i].firstName} ${customers[i].lastName}`,
        });
      }
    }

    setTimeout(() => {
      const doc = document.getElementsByClassName('ManageOrders')[0];

      doc.addEventListener('click', (e) => {
        const dateContent = document.getElementById('Date-content');
        const customerContent = document.getElementById('Customer-content');
        const statusContent = document.getElementById('Status-content');

        if (e.target.id !== 'Date-popover-icon') {
          dateContent.style.visibility = 'hidden';
        }

        if (e.target.id !== 'Customer-popover-icon') {
          customerContent.style.visibility = 'hidden';
        }

        if (e.target.id !== 'Status-popover-icon') {
          statusContent.style.visibility = 'hidden';
        }
      });
    }, 1000);
  }, []);

  const back = async () => {
    navigate(`/admin`);
  };

  const goToOrder = async (orderId) => {
    console.log(orderId);
    // navigate(`/order/${orderId}`);
  };

  const expand = async (key) => {
    const content = document.getElementById(`${key}-content`);
    const allContents = document.getElementsByClassName(`content`);
    for (let i = 0; i < allContents.length; i++) {
      allContents[i].style.visibility = 'hidden';
    }
    if (!visibile) {
      content.style.visibility = 'visible';
      setVisibile(true);
    } else {
      content.style.visibility = 'hidden';
      setVisibile(false);
    }
    content.style.visibility = 'visible';
    setVisibile(true);
  };

  const popoverDataListClick = async (key, value) => {
    if (key === 'Customer') {
      OrdersServices.getUserOrders(value).then((data) => {
        setOrders(data.orders);
        setTableData(data.orders);
        console.log(data.orders);
        // setPaginatedProducts(data.slice(0, 10));
      });

      console.log(
        customers.filter((object) => {
          return object._id !== value;
        })
      );

      for (let i = 0; i < tableData.length; i++) {
        console.log(tableData[i].user);
      }
      // const indexOfObject = customers.findIndex((object) => {
      //   return object._id !== value;
      // });

      // customers.splice(indexOfObject, 1);

      // console.log(customers);
      // console.log(tableData);
    }
  };

  const renderHeader = () => {
    let headerData = ['No.', 'Order Number', 'Customer', 'Date', 'Status'];
    let statuses = [];
    let dates = [];

    if (orders !== null) {
      for (let i = 0; i < orders.length; i++) {
        if (!statuses.includes(orders[i].status)) {
          statuses.push(orders[i].status);
        }
      }
    }

    if (orders !== null) {
      for (let i = 0; i < orders.length; i++) {
        if (!dates.includes(orders[i].created.slice(0, 10))) {
          dates.push(orders[i].created.slice(0, 10));
        }
      }
    }

    let data = [
      { value: 'No.', data: [] },
      { value: 'Order Number', data: tableData },
      { value: 'Customer', data: customers },
      { value: 'Date', data: dates },
      { value: 'Status', data: statuses },
    ];

    return headerData.map((key, i) => {
      return (
        (key !== 'No.' && (
          <th key={i} id={`${key}-th`}>
            <Popover
              icon={ExpandIcon}
              keyValue={key}
              onClick={() => expand(key)}
              data={data[i].data}
            >
              {(key === 'Customer' && customers && (
                <ul>
                  {data[2].data.map((customer, i) => (
                    <li
                      key={i}
                      onClick={() => popoverDataListClick(key, customer._id)}
                    >{`${customer.firstName} ${customer.lastName}`}</li>
                  ))}
                </ul>
              )) ||
                (key === 'Date' && orders && (
                  <ul>
                    {data[3].data.map((date, i) => (
                      <li
                        key={i}
                        onClick={() => popoverDataListClick(key, date)}
                      >
                        {date}
                      </li>
                    ))}
                  </ul>
                )) ||
                (key === 'Status' && orders && (
                  <ul>
                    {data[4].data.map((status, i) => (
                      <li
                        key={i}
                        onClick={() => popoverDataListClick(key, status)}
                      >
                        {status}
                      </li>
                    ))}
                  </ul>
                ))}
            </Popover>
            {key}
          </th>
        )) || (
          <th key={i} id={`${key}-th`}>
            {key}
          </th>
        )
      );
    });
  };

  const renderBody = () => {
    console.log(tableData);
    return (
      tableData &&
      tableData.map((order, i) => {
        return (
          <tr
            key={i}
            className='row-data'
            onClick={() => {
              goToOrder(order._id);
            }}
          >
            <td>{i + 1}</td>
            <td>{order.orderNumber}</td>
            {/* <td>{`${order.user}`}</td> */}
            <td>{`${order.user.firstName} ${order.user.lastName}`}</td>
            <td>{order.created.slice(0, 10)}</td>
            <td>{order.status}</td>
          </tr>
        );
      })
    );
  };

  return (
    <div className='ManageOrders'>
      <h1>Manage Orders</h1>
      <Button onClick={back}>Back</Button>
      <div className='orders-table' style={{ overflowX: 'auto' }}>
        <MyTable renderHeader={renderHeader} renderBody={renderBody}></MyTable>
      </div>
    </div>
  );
};

export default ManageOrders;
