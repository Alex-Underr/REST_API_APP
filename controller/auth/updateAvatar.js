const fs = require("fs/promises");
const path = require("path");
const Jimp = require("jimp");
const { User } = require("../../schema/users");

const avatarsFolder = path.join(__dirname, "../../", "public", "avatars");

const updateAvatar = async (req, res) => {
  const { _id } = req.user;
  const { path: tmpFolder, originalname } = req.file;
  const extention = originalname.split(".").pop();
  const filename = `${_id}.${extention}`;
  Jimp.read(tmpFolder, function (err, image) {
    if (err) throw err;
    image.resize(250, 250).write(path.join(avatarsFolder, filename));
  });
  const resultUpload = path.join(avatarsFolder, filename);
  await fs.rename(tmpFolder, resultUpload);
  const avatarURL = path.join("avatars", filename);

  await User.findByIdAndUpdate(_id, { avatarURL });
  res.json({ avatarURL });
};
module.exports = updateAvatar;
