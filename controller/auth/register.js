const bcrypt = require("bcryptjs");
const gravatar = require("gravatar");
const { User } = require("../../schema/users");
const { requestError } = require("../../helpers");

const register = async (req, res) => {
  const { name, email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw requestError(409, "Email in use");
  }
  const hashPassword = await bcrypt.hash(password, 10);
  const avatarUrl = gravatar.url(email);
  const result = await User.create({
    name,
    email,
    password: hashPassword,
    avatarUrl,
  });
  res.status(201).json({
    name: result.name,
    email: result.email,
  });
};

module.exports = register;
