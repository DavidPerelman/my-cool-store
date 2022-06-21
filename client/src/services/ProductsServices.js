import axios from 'axios';

const ProductsServices = {
  register: async (data) => {
    try {
      let res = await axios.post('/user/register', data);
      return res;
    } catch (err) {
      return err.response.data.errMessage;
    }
  },
  login: async (data) => {
    try {
      let res = await axios.post('/user/login', data);
      return res;
    } catch (err) {
      return err.response.data.errMessage;
    }
  },
  logout: async () => {
    try {
      let res = await axios.get('/user/logout');
      return res;
    } catch (err) {
      return err.response.data.errMessage;
    }
  },
};

export default ProductsServices;
