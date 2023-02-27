const express = require("express");
const router = express.Router();
const { controllerCatches } = require("../../helpers");
const validator = require("../../middlewares");
const controllers = require("../../controller");
const { schemas } = require("../../schema/contacts");

router.get("/", controllerCatches(controllers.listContacts));

router.get("/:id", controllerCatches(controllers.getContactById));

router.post("/", validator(schemas), controllerCatches(controllers.addContact));

router.put(
  "/:id",
  validator(schemas),
  controllerCatches(controllers.updateContact)
);

router.patch(
  "/:id/favorite",
  validator(schemas.updateFavoriteSchema),
  controllerCatches(controllers.updateFavorite)
);

router.delete("/:id", controllerCatches(controllers.removeContact));

module.exports = router;
