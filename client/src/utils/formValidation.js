const isFormFieldsValid = (data) => {
  for (let key in data) {
    if (!data[key]) {
      return false;
    }
  }
  return true;
};

const isValidPassword = (password, verifyPassword) => {
  return (
    password.length < 6 ||
    (verifyPassword.length < 6 && password === verifyPassword)
  );
};

const isValidLoginPassword = (password) => {
  return password.length < 6;
};

// const isValidEmail = (email) => {
//   console.log(email);
//   const regexp =
//     /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

//   return regexp.test(email);
// };

const isValidEmail = (email) => {
  let regex = new RegExp('[a-z0-9]+@[a-z]+.[a-z]{2,3}');

  return regex.test(email);
};

export {
  isFormFieldsValid,
  isValidLoginPassword,
  isValidPassword,
  isValidEmail,
};
