const User = require('../models/userModel');
const bcrypt = require('bcryptjs');

const userLoginValidation = (data) => {
  const regexp =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  for (let key in data) {
    if (!data[key]) {
      return {
        validationForm: false,
        errMessage: 'all fields required!',
      };
    }
  }

  if (!regexp.test(email)) {
    return {
      validationForm: false,
      errMessage: 'invalid email!',
    };
  }

  return {
    validationForm: true,
  };
};

const checkIfUserExist = async (type, email) => {
  const existingUser = await User.findOne({ email });

  if (type === 'register') {
    if (existingUser) {
      return {
        existingUser: true,
        errMessage: 'An account with this email already exist.',
      };
    } else {
      return false;
    }
  }

  if (type === 'login') {
    if (!existingUser) {
      return {
        existingUser: false,
        errMessage: 'login error!',
      };
    }
  }

  return existingUser;
};

const checkIfPasswordCurrect = async (password, passwordHash) => {
  const passwordCorrect = await bcrypt.compare(password, passwordHash);

  if (!passwordCorrect) {
    return {
      currctPassword: false,
      errMessage: 'login error!',
    };
  }
  return passwordCorrect;
};

const checkIfUserVerified = async (data) => {
  if (data === false) {
    return {
      verified: false,
      errMessage: 'user not verify!',
    };
  }
  return data;
};

module.exports = {
  userLoginValidation,
  checkIfUserExist,
  checkIfPasswordCurrect,
  checkIfUserVerified,
};
