const { requestError } = require("../helpers");
const contacts = require("../models/contacts");
const removeContact = async (req, res, next) => {
  const { id } = req.params;
  const result = await contacts.removeContact(id);
  if (!result) {
    throw requestError(404, "Not found!");
  }
  res.status(204).send();
};

module.exports = removeContact;
