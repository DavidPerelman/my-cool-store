import React, { useEffect, useState } from 'react';
import MyTable from '../../../components/MyTable/MyTable';
import ProductsServices from '../../../services/ProductsServices';
import './ManageProducts.css';
import Button from '../../../components/Button/Button';
import { useNavigate } from 'react-router-dom';
import TablePagination from '../../../components/TablePagination/TablePagination';
import SearchBar from '../../../components/SearchBar/SearchBar';
import Modal from '../../../components/Modal/Modal';
import Form from '../../../components/Form';
import { isFormFieldsValid } from '../../../utils/formValidation';

const ManageProducts = () => {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [searchStatus, setSearchStatus] = useState(false);
  const [products, setProducts] = useState(null);
  const [categories, setCategories] = useState(null);
  const [tableData, setTableData] = useState(null);
  const [paginatedProducts, setPaginatedProducts] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [error, setError] = useState('');
  const [newProductData, setNewProductData] = useState({
    title: '',
    price: '',
    description: '',
    category: '',
    image: undefined,
  });

  useEffect(() => {
    ProductsServices.fetchAllProducts().then((data) => {
      setProducts(data.products);
      setTableData(data.products);
      setPaginatedProducts(data.products.slice(0, 10));
    });

    ProductsServices.fetchCategoriesData().then((data) => {
      setCategories(data.categories);
    });
  }, []);

  const handleShow = () => {
    categories.unshift({ _id: undefined, name: 'Select Category' });
    setShow(true);
  };

  const selectCategory = (e) => {
    console.log(e.target.value);
    console.log('selectCategory');
  };

  const handleClose = () => {
    clearFormFields();
    categories.shift();
    setShow(false);
  };

  const pageSize = 10;
  const pageCount = products ? Math.ceil(products.length / pageSize) : 0;
  const pageCountArray = new Array(pageCount).fill('').map((_, i) => i + 1);

  if (pageCount === 1) {
    return null;
  }

  const pagination = async (pageNum) => {
    setCurrentPage(pageNum);

    const startIndex = (pageNum - 1) * 10;

    const paginatedProduct = tableData.slice(startIndex, startIndex + 10);

    setPaginatedProducts(paginatedProduct);
  };

  const goToOrder = async (productId) => {
    console.log(productId);
    // navigate(`/order/${orderId}`);
  };

  const back = async () => {
    navigate(`/admin`);
  };

  const handleFormChange = (e, valKey) => {
    if (e.currentTarget.id === 'price') {
      const price = parseInt(e.currentTarget.value);

      setNewProductData((prevState) => {
        return { ...prevState, [valKey]: price };
      });
    } else if (
      e.currentTarget.type !== 'text' &&
      e.currentTarget.type !== 'number' &&
      e.currentTarget.type !== 'select-one'
    ) {
      const formData = { File: e.target.files[0] };

      setNewProductData((prevState) => {
        return { ...prevState, [valKey]: formData };
      });
    } else {
      const { value } = e.target;
      setNewProductData((prevState) => {
        return { ...prevState, [valKey]: value };
      });
    }
  };

  const showError = (error) => {
    setError(error);

    setTimeout(() => {
      setError('');
    }, 3000);
  };

  const addNewProduct = async () => {
    console.log(parseInt(newProductData.price));

    if (!isFormFieldsValid(newProductData))
      return showError('all fields required!');

    try {
      // handleClose();

      const newProductRes = await ProductsServices.createProduct(
        newProductData
      ).then((data) => {
        console.log(data);
      });
    } catch (err) {
      console.error(err);
    }
  };

  const clearFormFields = () => {
    setNewProductData({
      title: '',
      price: '',
      description: '',
      category: '',
      image: undefined,
    });
  };

  const renderHeader = () => {
    let headerData = ['No.', 'Title', 'Category', 'Price', 'Description'];

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
            (product) =>
              product.title.toLowerCase().includes(searchQuery) ||
              product.category.toLowerCase().includes(searchQuery) ||
              product.price.toString().toLowerCase().includes(searchQuery) ||
              product.description.toLowerCase().includes(searchQuery)
          )
          .map((product, i) => {
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
          })) ||
      (paginatedProducts &&
        paginatedProducts
          .filter(
            (product) =>
              product.title.toLowerCase().includes(searchQuery) ||
              product.category.toLowerCase().includes(searchQuery) ||
              product.price.toString().toLowerCase().includes(searchQuery) ||
              product.description.toLowerCase().includes(searchQuery)
          )
          .map((product, i) => {
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
          }))
    );
  };

  return (
    <div className='ManageProducts'>
      <h1>Manage Products</h1>
      <div className='controllers'>
        <div className='controllers-buttons'>
          <Button onClick={back} className='ManageProducts-back-button'>
            Back
          </Button>
          <Button onClick={handleShow} className='new-product-button'>
            New Product
          </Button>
        </div>
        <SearchBar
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          setSearchStatus={setSearchStatus}
          searchStatus={searchStatus}
        />
      </div>

      <div className='products-table'>
        {/* <div className='products-table' style={{ overflowX: 'scroll' }}> */}

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
          onSubmit={addNewProduct}
          error={error}
        >
          <Form
            data={newProductData}
            handleFormChange={handleFormChange}
            handleSelectChange={selectCategory}
            selectData={categories}
          ></Form>
          <div className='modal-footer'>
            <Button
              size='user-modal-button'
              color='button--close'
              onClick={handleClose}
            >
              Close
            </Button>
            <Button size='user-modal-button' onClick={addNewProduct}>
              Add
            </Button>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default ManageProducts;
