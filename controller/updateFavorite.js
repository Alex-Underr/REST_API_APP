const { requestError } = require("../helpers");
const { Contact } = require("../schema/contacts");
const updateFavorite = async (req, res) => {
  const { id } = req.params;
  const result = await Contact.findByIdAndUpdate(id, req.body, {
    new: true,
  });
  if (!result) {
    throw requestError(404, "Not found");
  }
  res.status(201).json(result);
};

module.exports = updateFavorite;
