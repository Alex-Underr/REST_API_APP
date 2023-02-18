const express = require("express");
const router = express.Router();
const { controllerCatches } = require("../../helpers");
const validator = require("../../middlewares");
const controllers = require("../../controller");
const { schema } = require("../../schema/contacts");
router.get("/", controllerCatches(controllers.listContacts));

router.get("/:id", controllerCatches(controllers.getContactById));

router.post("/", validator(schema), controllerCatches(controllers.addContact));

router.put(
  "/:id",
  validator(schema),
  controllerCatches(controllers.updateContact)
);

router.delete("/:id", controllerCatches(controllers.removeContact));

module.exports = router;
