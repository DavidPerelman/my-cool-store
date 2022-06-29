const isFormFieldsValid = (
  firstName,
  lastName,
  email,
  password,
  verifyPassword
) => {
  return !firstName || !lastName || !email || !password || !verifyPassword;
};

const isLoginFormFieldsValid = (data) => {
  for (let key in data) {
    if (!data[key]) {
      return false;
    }
  }
  return true;
  // return !email || !password;
};
// const isLoginFormFieldsValid = (email, password) => {
//   return !email || !password;
// };

const isValidPassword = (password, verifyPassword) => {
  return (
    password.length < 6 ||
    (verifyPassword.length < 6 && password === verifyPassword)
  );
};

const isValidLoginPassword = (password) => {
  return password.length < 6;
};

const isValidEmail = (email) => {
  const regexp =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  return regexp.test(email);
};

export {
  isFormFieldsValid,
  isLoginFormFieldsValid,
  isValidLoginPassword,
  isValidPassword,
  isValidEmail,
};
