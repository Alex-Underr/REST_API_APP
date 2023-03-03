const { requestError } = require("../../helpers");
const { schemas, Contact } = require("../../schema/contacts");

const updateContact = async (req, res, next) => {
  const { id } = req.params;
  const { error } = schemas.validate(req.body);
  if (error) {
    throw requestError(400, error.message);
  }
  const result = await Contact.findByIdAndUpdate(id, req.body, { new: true });
  if (!result) {
    throw requestError(404, "Not found!");
  }
  res.status(201).json(result);
};
module.exports = updateContact;
