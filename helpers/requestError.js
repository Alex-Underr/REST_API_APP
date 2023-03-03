const messages = {
  400: "Bad Request",
  401: "Unathorized",
  403: "Forbidden",
  404: "Not found",
  409: "Email in use",
  201: "Created",
};

const requestError = (status, message = messages[status]) => {
  const error = new Error(message);
  error.status = status;
  return error;
};

module.exports = requestError;
