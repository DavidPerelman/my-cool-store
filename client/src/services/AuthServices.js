import axios from 'axios';

const AuthService = {
  register: async (data) => {
    let res = await axios.post('/user/register', data);
    console.log('register');
    console.log(data);
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
    console.log(data);
  },
  logout: (data) => {
    console.log('logout');
  },
};

export default AuthService;
