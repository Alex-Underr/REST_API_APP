const { User } = require("../../schema/users");
const { requestError, sendEmail } = require("../../helpers");

const { BASE_URL } = process.env;

const resendEmail = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user || user.verify) {
    throw requestError(404, "Already verifyed!");
  }

  const mail = {
    to: email,
    subject: "Verify email",
    html: `<a target="_blank" href="${BASE_URL}/api/users/verify/${user.verificationToken}">Click to verify you email</a>`,
  };
  await sendEmail(mail)
    .then(() => console.log("Verification token send!"))
    .catch((error) => console.log(error));

  res.json({
    message: "Email send success",
  });
};

module.exports = resendEmail;
