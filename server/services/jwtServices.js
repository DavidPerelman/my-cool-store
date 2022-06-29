const jwt = require('jsonwebtoken');

const createToken = async (userId) => {
  const token = jwt.sign(
    {
      user: userId,
    },
    process.env.JWT_SECRET
  );
  return token;
};

module.exports = {
  createToken,
};
