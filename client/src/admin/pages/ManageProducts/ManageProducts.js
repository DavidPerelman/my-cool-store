import React, { useEffect, useState } from 'react';
import MyTable from '../../../components/MyTable/MyTable';
import ProductsServices from '../../../services/ProductsServices';
import './ManageProducts.css';
import ExpandIcon from '../../asset/expand-icon.png';
// import Popover from '../../components/Popover/Popover';
import Popover from '../../../components/Popover/Popover';
import Button from '../../../components/Button/Button';
import { useNavigate } from 'react-router-dom';

const ManageProducts = () => {
  const navigate = useNavigate();
  const [visibile, setVisibile] = useState(false);
  const [products, setProducts] = useState(null);
  const [categories, setCategories] = useState(null);
  const [tableData, setTableData] = useState(null);

  useEffect(() => {
    ProductsServices.fetchAllProducts().then((data) => {
      setProducts(data.products);
      setTableData(data.products);
    });

    ProductsServices.fetchCategoriesData().then((data) => {
      setCategories(data.categories);
    });

    setTimeout(() => {
      const doc = document.getElementsByClassName('ManageProducts')[0];
      console.log(doc);

      doc.addEventListener('click', (e) => {
        const categoryContent = document.getElementById('Category-content');

        if (e.target.id !== 'Category-popover-icon') {
          categoryContent.style.visibility = 'hidden';
        }
      });
    }, 1000);
  }, []);

  const goToOrder = async (productId) => {
    console.log(productId);
    // navigate(`/order/${orderId}`);
  };

  const categoryListClick = async (categoryId) => {
    console.log(categoryId);
    // navigate(`/order/${orderId}`);
  };

  const back = async () => {
    navigate(`/admin`);
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

  const renderHeader = () => {
    let headerData = ['No.', 'Title', 'Category', 'Price', 'Description'];

    return headerData.map((key, i) => {
      {
        return (
          (key === 'Category' && (
            <th key={i} className={`Category-th`}>
              <div id={`Category-th`}>
                {' '}
                {key}
                <Popover
                  icon={ExpandIcon}
                  keyValue={key}
                  // expand={expand}
                  onClick={() => expand(key)}
                  categories={categories}
                  categoryListClick={categoryListClick}
                >
                  <ul>
                    {categories &&
                      categories.map((category, i) => (
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
              </div>
            </th>
          )) || (
            <th key={i} className={`${key}-th`}>
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
            <td className='description-td'>{product.description}</td>
          </tr>
        );
      })
    );
  };

  return (
    <div className='ManageProducts'>
      <h1>Manage Products</h1>
      <Button onClick={back}>Back</Button>
      <div className='products-table'>
        <MyTable renderHeader={renderHeader} renderBody={renderBody}></MyTable>
      </div>
    </div>
  );
};

export default ManageProducts;
