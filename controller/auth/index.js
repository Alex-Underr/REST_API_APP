const register = require("./register");
const login = require("./login");
const getCurrentUser = require("./getCurrent");
const logout = require("./logout");
const subscription = require("./subscription");

module.exports = {
  register,
  login,
  getCurrentUser,
  logout,
  subscription,
};
