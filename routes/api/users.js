const express = require("express");

const { validateFunc, authentication } = require("../../middlewares");
const { controllerCatches } = require("../../helpers");
const { joiUserSchemas } = require("../../schema/users");
const controllers = require("../../controller/auth");
const router = express.Router();

router.post(
  "/register",
  validateFunc(joiUserSchemas.registerSchema),
  controllerCatches(controllers.register)
);

router.post(
  "/login",
  validateFunc(joiUserSchemas.loginSchema),
  controllerCatches(controllers.login)
);

router.get(
  "/current",
  authentication,
  controllerCatches(controllers.getCurrent)
);

router.get("/logout", authentication, controllerCatches(controllers.logout));

router.patch(
  "/users/:id/subscription",
  authentication,
  validateFunc(joiUserSchemas.subscriptionSchema),
  controllerCatches(controllers.subscription)
);

module.exports = router;
