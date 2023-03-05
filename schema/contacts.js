const Joi = require("joi");
const { Schema, model } = require("mongoose");
const { handleSaveErrors } = require("../helpers");
const mongoosePaginate = require("mongoose-paginate-v2");

const schema = Joi.object({
  name: Joi.string().alphanum().min(3).max(30).required(),

  phone: Joi.string().required(),

  email: Joi.string()
    .email({
      minDomainSegments: 1,
      tlds: { allow: ["com", "net", "uk"] },
    })
    .required(),
});

const contactsSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for contact"],
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
  },
  { versionKey: false, timestamps: true }
);
contactsSchema.post("save", handleSaveErrors);
contactsSchema.plugin(mongoosePaginate);

const updateFavoriteSchema = Joi.object({
  favorite: Joi.boolean().required(),
});

const schemas = {
  schema,
  updateFavoriteSchema,
};
const Contact = model("contact", contactsSchema);

module.exports = { schemas, Contact };
