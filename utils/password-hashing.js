const bcrypt = require('bcrypt');

const passwordHashing = async (password) => {
  const salt = await bcrypt.genSalt(3);
  return bcrypt.hash(password, salt);
}

module.exports = passwordHashing;
