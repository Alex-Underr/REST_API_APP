const { requestError } = require("../helpers");
const contacts = require("../models/contacts");

const getContactById = async (req, res, next) => {
  const { id } = req.params;
  const result = await contacts.getContactById(id);
  if (!result) {
    throw requestError(404, "Not found!");
  }
  res.json(result);
};
module.exports = getContactById;
