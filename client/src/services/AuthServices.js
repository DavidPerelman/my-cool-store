import axios from 'axios';
// const url = 'https://localhost:3001';
const url = 'https://stark-tundra-31639.herokuapp.com/';

const AuthService = {
  register: async (data) => {
    try {
      let res = await axios.post(
        `${process.env.REACT_APP_API_URL}/user/register`,
        data
      );
      return res;
    } catch (err) {
      return err.response.data.errMessage;
    }
  },
  login: async (data) => {
    try {
      let loginRes = await axios.post(
        `${process.env.REACT_APP_API_URL}/user/login`,
        data
      );

      console.log(loginRes);
      return loginRes;
    } catch (err) {
      return err;
    }
  },
  logout: async () => {
    try {
      let res = await axios.get(`${process.env.REACT_APP_API_URL}/user/logout`);
      return res;
    } catch (err) {
      return err.response.data.errMessage;
    }
  },
};

export default AuthService;
