const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { User } = require('../../models/users');
const { controllerWrapper, HttpError } = require('../../utils');

const { SECRET_KEY } = process.env;

const registerUser = controllerWrapper(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw new HttpError(409, 'Email in use');
  }
  const hashPassword = await bcrypt.hash(password, 10);

  const userData = {
    ...req.body,
  };

  const newUser = await User.create({
    ...userData,
    avatarUrl: '',
    password: hashPassword,
  });

  const payload = {
    id: newUser._id,
  };

  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '23h' });
  await User.findByIdAndUpdate(newUser._id, { token });

  res.status(201).json({
    token,
    user: {
      name: newUser.name,
      email: newUser.email,
      avatarUrls: newUser.avatarUrls,
      userParams: newUser.userParams,
      createdAt: newUser.createdAt,
    },
  });
});

module.exports = registerUser;
