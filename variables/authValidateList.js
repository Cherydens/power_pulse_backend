const authValidateList = {
  emailRegExp:
    /^([a-z0-9_-]+.)*[a-z0-9_-]+@[a-z0-9_-]+(.[a-z0-9_-]+)*.[a-z]{2,6}$/,
  passwordRegExp:
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,32}$/,
  passwordMinLength: 8,
  passwordMaxLength: 32,
};

module.exports = authValidateList;
