import React, { useEffect, useState } from 'react';
import MyTable from '../../../components/MyTable/MyTable';
import ProductsServices from '../../../services/ProductsServices';
import './ManageProducts.css';
import ExpandIcon from '../../asset/expand-icon.png';

const ManageProducts = () => {
  const [products, setProducts] = useState(null);
  const [tableData, setTableData] = useState(null);

  useEffect(() => {
    ProductsServices.fetchAllProducts().then((data) => {
      console.log(data);
      setProducts(data.products);
      setTableData(data.products);
    });
  }, []);

  const goToOrder = async (productId) => {
    console.log(productId);
    // navigate(`/order/${orderId}`);
  };

  const expand = async (key) => {
    console.log(key);
  };

  const renderHeader = () => {
    let headerData = ['No.', 'Title', 'Category', 'Price', 'Description'];

    return headerData.map((key, i) => {
      {
        return (
          ((key === 'Title' || key === 'Category') && (
            <th key={i} className={`${key}-th`}>
              <div>
                {key}{' '}
                <img
                  className='expand-icon'
                  src={ExpandIcon}
                  alt='Logo'
                  onClick={() => expand(key)}
                />
              </div>
            </th>
          )) || (
            <th key={i}>
              <div>{key}</div>
            </th>
          )
        );
      }
    });
  };

  const renderBody = () => {
    return (
      tableData &&
      tableData.map((product, i) => {
        return (
          <tr
            key={i}
            className='row-data'
            onClick={() => {
              goToOrder(product._id);
            }}
          >
            <td>{i + 1}</td>
            <td>{product.title}</td>
            <td>{product.category}</td>
            <td>{product.price}</td>
            <td>{product.description}</td>
          </tr>
        );
      })
    );
  };

  return (
    <div className='ManageProducts'>
      <h1>Manage Products</h1>
      <div className='products-table'>
        <MyTable renderHeader={renderHeader} renderBody={renderBody}></MyTable>
      </div>
    </div>
  );
};

export default ManageProducts;
