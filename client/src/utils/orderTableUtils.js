const increment = async (dataTable, product) => {
  const productId = product.product._id;

  let updatedProducts = dataTable.map((product) => {
    if (product.product._id === productId) {
      if (product.productQuantity < 99) {
        return {
          ...product,
          productQuantity: product.productQuantity + 1,
        };
      }
    }

    return product;
  });

  return updatedProducts;
};

const decrement = async (dataTable, product) => {
  const productId = product.product._id;

  let updatedProducts = dataTable.map((product) => {
    if (product.product._id === productId) {
      if (product.productQuantity > 1) {
        return {
          ...product,
          productQuantity: product.productQuantity - 1,
        };
      }
    }

    return product;
  });

  return updatedProducts;
};

const renderHeader = () => {
  let headerData = ['No.', 'Product', 'Price', 'Quantity', 'Total'];

  return headerData.map((key, i) => {
    return <th key={i}>{key}</th>;
  });
};

export { increment, decrement, renderHeader };
