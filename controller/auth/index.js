const register = require("./register");
const login = require("./login");
const getCurrentUser = require("./getCurrent");
const logout = require("./logout");
const subscription = require("./subscription");
const updateAvatar = require("./updateAvatar");
const verify = require("./verify");
const resendEmail = require("./resendEmail");

module.exports = {
  register,
  login,
  getCurrentUser,
  logout,
  subscription,
  updateAvatar,
  verify,
  resendEmail,
};
