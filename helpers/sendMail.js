const sgMail = require("@sendgrid/mail");
require("dotenv").config();

const { SENDER } = process.env;

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendEmail = async (data) => {
  const email = { ...data, from: `${SENDER}` };
  try {
    await sgMail.send(email).then(() => {
      console.log("Email sent");
    });
  } catch (error) {
    throw new Error();
  }
};

module.exports = sendEmail;
