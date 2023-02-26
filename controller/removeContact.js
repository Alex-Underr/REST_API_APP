const { requestError } = require("../helpers");
const { Contact } = require("../schema/contacts");
const removeContact = async (req, res, next) => {
  const { id } = req.params;
  const result = await Contact.findByIdAndRemove(id);
  if (!result) {
    throw requestError(404, "Not found!");
  }
  res.status(204).send();
};

module.exports = removeContact;
