const multer = require("multer");
const path = require("path");

const tmpFolder = path.join(__dirname, "../", "temp");

const multerConfig = multer.diskStorage({
  destination: tmpFolder,
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({
  storage: multerConfig,
});

module.exports = upload;
