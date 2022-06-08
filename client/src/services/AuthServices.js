const AuthService = {
  register: (error, data) => {
    console.log('register');
    console.log(data);
  },
  login: (error, data) => {
    console.log('login');
    console.log(data);
  },
  logout: (data) => {
    console.log('logout');
  },
};

export default AuthService;
