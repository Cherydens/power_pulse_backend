const regexpList = {
  email: /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/,
  password: /^(?=.*\d)(?=.*[a-zA-Z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,32}$/,
};

module.exports = regexpList;
