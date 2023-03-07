const express = require("express");
const router = express.Router();

const { controllerCatches } = require("../../helpers");
const { validateFunc, authentication } = require("../../middlewares");
const controllers = require("../../controller/contacts");
const { schemas } = require("../../schema/contacts");

router.get("/", authentication, controllerCatches(controllers.listContacts));

router.get(
  "/:id",
  authentication,
  controllerCatches(controllers.getContactById)
);

router.post(
  "/",
  authentication,
  validateFunc(schemas.schema),
  controllerCatches(controllers.addContact)
);

router.put(
  "/:id",
  authentication,
  validateFunc(schemas.schema),
  controllerCatches(controllers.updateContact)
);

router.patch(
  "/:id/favorite",
  authentication,
  validateFunc(schemas.updateFavoriteSchema),
  controllerCatches(controllers.updateFavorite)
);

router.delete(
  "/:id",
  authentication,
  controllerCatches(controllers.removeContact)
);

module.exports = router;
