const { Contact } = require("../../schema/contacts");

const listContacts = async (req, res) => {
  const { _id: owner } = req.user;
  console.log(owner);
  const result = await Contact.find().populate("owner", "name email");
  res.json(result);
};

module.exports = listContacts;
