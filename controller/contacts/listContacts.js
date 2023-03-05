const { Contact } = require("../../schema/contacts");

const listContacts = async (req, res) => {
  try {
    const { _id: owner } = req.user;
    console.log(owner);
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const options = {
      page,
      limit,
      sort: { name: 1 },
      populate: "owner",
      select: "name email phone",
    };

    const favorite = req.query.favorite;
    const filter = {};
    if (favorite !== undefined) {
      filter.favorite = favorite;
    }
    const favoriteContacts = await Contact.find(filter);
    if (favoriteContacts.length === 0) {
      res.status(404).json({ message: "Not find" });
    }
    // res.json(favoriteContacts);

    const resultPaginate = await Contact.paginate(filter, options);
    res.json(resultPaginate);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = listContacts;
