const express = require("express");
const logger = require("morgan");
const cors = require("cors");
// const jwt = require("jsonwebtoken");
// const { SECRET_KEY } = process.env;
const contactsRouter = require("./routes/api/contacts");
const usersRouter = require("./routes/api/users");

const app = express();

app.use(express.static("public"));
app.use(express.static("public/avatars"));

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use("/api/contacts", contactsRouter);
app.use("/api/users", usersRouter);

app.use((req, res, next) => {
  const error = new Error("Not found!");
  error.status = 404;
  next(error);
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error!" } = err;
  res.status(status).json({ message });
});

module.exports = app;

// Перевірка токена через jwt

// const payload = {
//   id: "63f3a1546165dbb60d7e6c52",
// };
// const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "1h" });
// // const id = jwt.decode(token, SECRET_KEY);
// try {
//   const id = jwt.verify(token, SECRET_KEY);
//   console.log(id);
// } catch (error) {
//   error.status = 401;
//   console.log(error.status);
//   console.log(error.message);
// }
