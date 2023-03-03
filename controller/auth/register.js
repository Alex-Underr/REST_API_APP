const bcrypt = require("bcryptjs");

const { User } = require("../../schema/users");
const { requestError } = require("../../helpers");

const register = async (req, res) => {
  const { name, email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw requestError(409, "Email in use");
  }
  const hashPassword = await bcrypt.hash(password, 10);
  const result = await User.create({ name, email, password: hashPassword });
  res.status(201).json({
    name: result.name,
    email: result.email,
  });
};

module.exports = register;

// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzZGQzMTMyMTcwOGRkNGQ2ZGUyZDNlYyIsImlhdCI6MTY3NTQ0MDQ1MCwiZXhwIjoxNjc1NTI2ODUwfQ.HUrm_5AbrIqwLZ1dSZ9dOLF2pbKoVqJ2k-q9pxjWGnM
