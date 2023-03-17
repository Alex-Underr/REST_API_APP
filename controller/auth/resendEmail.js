const { User } = require("../../schema/users");
const { requestError, sendEmail } = require("../../helpers");

const { BASE_URL } = process.env;

const resendEmail = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user || user.verify) {
    throw requestError(404);
  }

  const mail = {
    to: email,
    subject: "Verify email",
    html: `<a target="_blank" href="${BASE_URL}/api/auth/verify/${user.verificationToken}">Click to verify you email</a>`,
  };
  await sendEmail(mail);

  res.json({
    message: "Email send success",
  });
};

module.exports = resendEmail;
