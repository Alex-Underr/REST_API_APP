const { Schema, model } = require("mongoose");
const Joi = require("joi");
const { handleSaveErrors } = require("../helpers");

const emailValidate = /^[a-z0-9]+@[a-z]+\.[a-z]{2,3}$/;
const typesOfSubscriptions = ["starter", "pro", "business"];

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Sen user name"],
    },
    password: {
      type: String,
      required: [true, "Set password for user"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    subscription: {
      type: String,
      enum: ["starter", "pro", "business"],
      default: "starter",
    },
    token: {
      type: String,
      default: "",
    },
    avatarURL: {
      type: String,
      // required: [true, "Avatar is required"],
    },
    verify: {
      type: Boolean,
      default: false,
    },
    verificationToken: {
      type: String,
      required: [true, "Verify token is required"],
      default: "",
    },
  },
  { versionKey: false, timestamps: true }
);
userSchema.post("save", handleSaveErrors);

const registerSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string()
    .email({
      minDomainSegments: 1,
      tlds: { allow: ["com", "net", "uk"] },
    })
    .pattern(emailValidate)
    .required(),
  password: Joi.string().alphanum().min(6).max(30).required(),
});

const loginSchema = Joi.object({
  email: Joi.string()
    .email({
      minDomainSegments: 1,
      tlds: { allow: ["com", "net", "uk"] },
    })
    .pattern(emailValidate)
    .required(),
  password: Joi.string().alphanum().min(6).max(30).required(),
});

const subscriptionSchema = Joi.object({
  subscription: Joi.string()
    .valid(...typesOfSubscriptions)
    .required(),
});
const verifyEmailSchema = Joi.object({
  email: Joi.string().pattern(emailValidate).required(),
});
const joiUserSchemas = {
  registerSchema,
  loginSchema,
  subscriptionSchema,
  verifyEmailSchema,
};

const User = model("user", userSchema);

module.exports = { User, joiUserSchemas };
