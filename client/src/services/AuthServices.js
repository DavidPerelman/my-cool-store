import axios from 'axios';

const AuthService = {
  register: async (data) => {
    try {
      let res = await axios.post('/user/register', data);
      return res;
    } catch (err) {
      console.log(err.response.data.errMessage);
      return err.response.data.errMessage;
    }
  },
  login: async (data) => {
    try {
      let res = await axios.post('/user/login', data);
      console.log(res);
      return res;
    } catch (err) {
      console.log(err.response.data.errMessage);
      return err.response.data.errMessage;
    }
  },
  logout: (data) => {
    console.log('logout');
  },
};

export default AuthService;
