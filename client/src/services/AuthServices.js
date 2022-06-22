import axios from 'axios';
// const url = 'https://localhost:3001';
const url = 'https://stark-tundra-31639.herokuapp.com/';

const AuthService = {
  register: async (data) => {
    try {
      let res = await axios.post(`${url}user/register`, data);
      return res;
    } catch (err) {
      return err.response.data.errMessage;
    }
  },
  login: async (data) => {
    try {
      let res = await axios.post(`${url}user/login`, data);
      return res;
    } catch (err) {
      return err.response.data.errMessage;
    }
  },
  logout: async () => {
    try {
      let res = await axios.get(`${url}user/logout`);
      return res;
    } catch (err) {
      return err.response.data.errMessage;
    }
  },
};

export default AuthService;
