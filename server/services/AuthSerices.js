const {
  userLoginValidation,
  checkIfUserExist,
  checkIfPasswordCurrect,
  checkIfUserVerified,
} = require('./userServices');
const { createToken } = require('./jwtServices');

const userValidationAndAuth = async (email, password) => {
  const formValidation = userLoginValidation(email, password);
  if (formValidation.validationForm === false) {
    return res.status(400).json(formValidation.errMessage);
  }

  const user = await checkIfUserExist(email);
  if (user.existingUser === false) {
    return res.status(400).json(user.errMessage);
  }

  const passwordCorrect = await checkIfPasswordCurrect(
    password,
    user.passwordHash
  );
  if (passwordCorrect.currctPassword === false) {
    return res.status(400).json(passwordCorrect.errMessage);
  }

  const userVerified = await checkIfUserVerified(user.verified);
  if (userVerified.verified === false) {
    return res.status(400).json(userVerified.errMessage);
  }

  const token = await createToken(user._id);
  user.token = token;
  user.save();

  return { user };
};

module.exports = {
  userValidationAndAuth,
};
