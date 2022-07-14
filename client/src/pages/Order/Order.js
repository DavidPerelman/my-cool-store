import React, { useEffect, useContext, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Button from '../../components/Button/Button';
import Table from '../../components/Table/Table';
import OrdersServices from '../../services/OrdersServices';
import { dataTableParse } from '../../utils/tablesUtils';
import AuthContext from '../../context/authContext';
import OrderContainer from '../../containers/OrderContainer';
import OrderDetails from '../../containers/OrderDetails';
import SaveIcon from '../../asset/save-icon.png';
import DeleteIcon from '../../asset/delete-icon.png';
import CreditCardIcon from '../../asset/credit-card-icon.png';
import BackIcon from '../../asset/back-icon.png';
import CancelChangesIcon from '../../asset/cancel-changes-icon.png';
import EditIcon from '../../asset/edit-icon.png';
import OrderFunctions, {
  checkout,
  deleteOrder,
  saveOrder,
  editOrder,
  cancelChanges,
} from '../../services/OrderFunctions';
import MyTable from '../../components/MyTable/MyTable';

const Order = () => {
  const navigate = useNavigate();
  const { userData } = useContext(AuthContext);
  const [dataTable, setDataTable] = useState(null);
  const { orderId } = useParams();
  const [orderData, setOrderData] = useState(null);

  useEffect(() => {
    OrdersServices.getOrder(orderId).then((data) => {
      setOrderData(data.order);
      setDataTable(data.order.products);
    });
  }, []);

  const backToMyOrders = () => {
    console.log(`/orders/${userData._id}`);
    navigate(`/orders/${userData._id}`);
  };

  const decrement = (product) => {
    const productId = product.product._id;
    let updatedProducts = dataTable.map((product) => {
      if (product.productQuantity > 1) {
        if (product.product._id === productId) {
          return { ...product, productQuantity: product.productQuantity - 1 };
        }
      }
      return product;
    });

    setDataTable(updatedProducts);
  };

  const increment = (product) => {
    const productId = product.product._id;
    let updatedProducts = dataTable.map((product) => {
      if (product.productQuantity < 99) {
        if (product.product._id === productId) {
          return { ...product, productQuantity: product.productQuantity + 1 };
        }
      }
      return product;
    });

    setDataTable(updatedProducts);
  };

  const renderHeader = () => {
    let headerData = ['No.', 'Product', 'Price', 'Quantity', 'Total'];

    return headerData.map((key, i) => {
      return <th key={i}>{key.toUpperCase()}</th>;
    });
  };

  const renderBody = () => {
    return (
      dataTable &&
      dataTable.map((product, i) => {
        console.log(product);
        return (
          <tr key={i}>
            <td>{i + 1}</td>
            <td>{product.product.title}</td>
            <td>{product.product.price}$</td>
            <td>
              <Button size='circle-button' onClick={() => decrement(product)}>
                -
              </Button>{' '}
              {product.productQuantity}{' '}
              <Button size='circle-button' onClick={() => increment(product)}>
                +
              </Button>
            </td>
            <td>{product.product.price * product.productQuantity}$</td>
          </tr>
        );
      })
    );
  };

  return (
    <div className='OrderPage'>
      <Button onClick={backToMyOrders} size={'my-orders-button'}>
        <img
          className='icon-button my-orders-icon'
          src={BackIcon}
          alt='BackIcon'
        />
        My Orders
      </Button>
      <OrderContainer orderData={orderData}></OrderContainer>
      <div className='order-div'>
        <MyTable renderHeader={renderHeader} renderBody={renderBody}></MyTable>
      </div>

      {/* <Button onClick={deleteOrder}>
        Cancel Order{' '}
        <img
          className='icon-button'
          src={CancelChangesIcon}
          alt='CancelChangesIcon'
        />
      </Button>
      <Button onClick={deleteOrder}>
        Delete Order{' '}
        <img className='icon-button' src={DeleteIcon} alt='DeleteIcon' />
      </Button>
      <Button onClick={checkout}>
        Check Out{' '}
        <img
          className='icon-button'
          src={CreditCardIcon}
          alt='CreditCardIcon'
        />
      </Button> */}
    </div>
  );
};

export default Order;
