const { requestError } = require("../helpers");
const { Contact } = require("../schema/contacts");
const { schema } = require("../schema/contacts");

const updateContact = async (req, res, next) => {
  const { id } = req.params;
  const { error } = schema.validate(req.body);
  if (error) {
    throw requestError(400, error.message);
  }
  const result = await Contact.findByIdAndUpdate(id, req.body);
  if (!result) {
    throw requestError(404, "Not found!");
  }
  res.status(201).json(result);
};
module.exports = updateContact;
