const express = require("express");

const { validateFunc, authentication } = require("../../middlewares");
const { controllerCatches } = require("../../helpers");
const { joiUserSchemas } = require("../../schema/users");
const controllers = require("../../controller/auth");
const router = express.Router();
const upload = require("../../middlewares/upload");
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

router.get("/verify/:verificationToken", controllerCatches(controllers.verify));

router.post(
  "/verify",
  validateFunc(joiUserSchemas.verifyEmailSchema),
  controllerCatches(controllers.resendEmail)
);

router.get(
  "/current",
  authentication,
  controllerCatches(controllers.getCurrentUser)
);

router.get("/logout", authentication, controllerCatches(controllers.logout));

router.patch(
  "/:id/subscription",
  authentication,
  validateFunc(joiUserSchemas.subscriptionSchema),
  controllerCatches(controllers.subscription)
);

router.patch(
  "/avatar",
  authentication,
  upload.single("avatar"),
  controllerCatches(controllers.updateAvatar)
);

module.exports = router;
