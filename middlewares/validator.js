const { requestError } = require("../helpers");

const validateFunc = schema => {
  const func = (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      next (requestError(400, error.message));
    }
    next();
  };
  return func;
};

module.exports = validateFunc;
