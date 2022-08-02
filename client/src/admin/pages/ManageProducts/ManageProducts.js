import React, { useEffect, useState } from 'react';
import MyTable from '../../../components/MyTable/MyTable';
import ProductsServices from '../../../services/ProductsServices';
import './ManageProducts.css';
import ExpandIcon from '../../asset/expand-icon.png';
import MyPopover from '../../../components/MyPopover/MyPopover';

const ManageProducts = () => {
  const [visibile, setVisibile] = useState(false);
  const [products, setProducts] = useState(null);
  const [tableData, setTableData] = useState(null);

  useEffect(() => {
    ProductsServices.fetchAllProducts().then((data) => {
      setProducts(data.products);
      setTableData(data.products);
    });

    document.addEventListener('click', (e) => {
      const categoryContent = document.getElementById('Category-content');
      const titleContent = document.getElementById('Title-content');

      if (e.target.id !== 'Category-expand-icon') {
        categoryContent.style.visibility = 'hidden';
      }

      if (e.target.id !== 'Title-expand-icon') {
        titleContent.style.visibility = 'hidden';
      }
    });
  }, []);

  const goToOrder = async (productId) => {
    console.log(productId);
    // navigate(`/order/${orderId}`);
  };

  const expand = async (key) => {
    const content = document.getElementById(`${key}-content`);
    const allContents = document.getElementsByClassName(`content`);

    for (let i = 0; i < allContents.length; i++) {
      console.log((allContents[i].style.visibility = 'hidden'));
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

  const renderHeader = () => {
    let headerData = ['No.', 'Title', 'Category', 'Price', 'Description'];

    return headerData.map((key, i) => {
      {
        return (
          ((key === 'Title' || key === 'Category') && (
            <th key={i} className={`${key}-th`}>
              {key}
              <div className='wrapper'>
                <img
                  id={`${key}-expand-icon`}
                  src={ExpandIcon}
                  alt='Logo'
                  onClick={() => expand(key)}
                />
                <div className='content' id={`${key}-content`}>
                  <ul>
                    <li></li>
                    <li></li>
                  </ul>
                </div>
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
