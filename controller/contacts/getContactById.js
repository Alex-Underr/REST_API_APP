const { requestError } = require("../../helpers");
const { Contact } = require("../../schema/contacts");

const getContactById = async (req, res, next) => {
  const { id } = req.params;
  const result = await Contact.findById(id);
  if (!result) {
    throw requestError(404, "Not found!");
  }
  res.json(result);
};
module.exports = getContactById;
