import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/Button/Button';
import MyTable from '../../../components/MyTable/MyTable';
import Popover from '../../../components/Popover/Popover';
import OrdersServices from '../../../services/OrdersServices';
import './ManageOrders.css';
import ExpandIcon from '../../asset/expand-icon.png';

const ManageOrders = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState(null);
  const [tableData, setTableData] = useState(null);

  useEffect(() => {
    OrdersServices.getAllOrders().then((data) => {
      setOrders(data.orders);
      setTableData(data.orders);
    });
  }, []);

  const back = async () => {
    navigate(`/admin`);
  };

  const goToOrder = async (orderId) => {
    console.log(orderId);
    // navigate(`/order/${orderId}`);
  };

  const expand = async (key) => {
    // const content = document.getElementById(`${key}-content`);
    // const allContents = document.getElementsByClassName(`content`);
    // for (let i = 0; i < allContents.length; i++) {
    //   allContents[i].style.visibility = 'hidden';
    // }
    // if (!visibile) {
    //   content.style.visibility = 'visible';
    //   setVisibile(true);
    // } else {
    //   content.style.visibility = 'hidden';
    //   setVisibile(false);
    // }
    // content.style.visibility = 'visible';
    // setVisibile(true);
  };

  const categoryListClick = async (categoryId) => {
    // console.log(categoryId);
    // ProductsServices.fetchAllProductsByCategoryId(categoryId).then((data) => {
    //   setProducts(data);
    //   setTableData(data);
    //   setPaginatedProducts(data.slice(0, 10));
    // });
  };

  const renderHeader = () => {
    let headerData = ['No.', 'Order Number', 'Customer', 'Date', 'Status'];
    let data = ['No.', 'Order Number', 'Customer', 'Date', 'Status'];

    return headerData.map((key, i) => {
      console.log(data[i]);
      // return <th key={i}>{key}</th>;
      return (
        (key !== 'No.' && (
          <th key={i} id={`${key}-th`}>
            <Popover
              icon={ExpandIcon}
              keyValue={key}
              onClick={() => expand(key)}
              data={data[i]}
              categoryListClick={categoryListClick}
            >
              <ul>
                {data &&
                  data.map((category, i) => (
                    <li
                      key={i}
                      id={category._id}
                      onClick={() => categoryListClick(category._id)}
                    >
                      {category.name}
                    </li>
                  ))}
              </ul>
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
            <td>{`${order.user.firstName} ${order.user.lastName}`}</td>
            <td>{order.created}</td>
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
