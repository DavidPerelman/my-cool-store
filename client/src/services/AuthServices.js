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
  registerUser: async (data) => {
    return await fetch(`${process.env.REACT_APP_API_URL}/user/register`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    }).then((res) => {
      if (res.status !== 401) {
        return res.json().then((data) => data);
      } else {
        return { message: 'error' };
      }
    });
  },
  loginUser: async (data) => {
    return await fetch(`${process.env.REACT_APP_API_URL}/user/login`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    }).then((res) => {
      if (res.status !== 401) {
        return res.json().then((data) => data);
      } else {
        return { message: 'error' };
      }
    });
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
