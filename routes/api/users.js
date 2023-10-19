// The necessary modules and libraries are imported:

const express = require('express');

const {
  validateBody,
  authenticate,
  uploadImage,
} = require('../../middlewares');
const controllers = require('../../controllers/users');
const { userValidationSchemas } = require('../../utils');

// An Express router object is created:
const router = express.Router();

// Аутентифікація та авторизація
// Routes for handling various user-related requests are added to this router. Here's their description:

// Створити публічний ендпоінт реєстрації користувача - забезпечити можливість реєстрації нових користувачів.  Виконувати валідацію даних, включаючи перевірку правильності формату електронної адреси та пароля.
// Route for user registration (POST /register):
router.post(
  '/register',
  validateBody(userValidationSchemas.registerUserSchema),
  controllers.registerUser
);

// Route for verification user's email (GET /verify/:verificationToken):
router.get('/verify/:verificationToken', controllers.verifyUserEmail);

// Route for resend verification user's email (POST /verify):
router.post(
  '/verify',
  validateBody(userValidationSchemas.verifyUserEmailSchema),
  controllers.resendVerifyUserEmail
);

// Створити публічний ендпоінт логінізації користувача - забезпечити вхід за допомогою існуючих облікових записів.  Виконувати валідацію даних, включаючи перевірку правильності формату електронної адреси та пароля.
// Route for user login (POST /login):
router.post(
  '/login',
  validateBody(userValidationSchemas.loginUserSchema),
  controllers.loginUser
);

// Route for updating the user's subscription information (PATCH /):
router.patch(
  '/',
  authenticate,
  validateBody(userValidationSchemas.updateSubscriptionUserSchema),
  controllers.updateSubscriptionUser
);

// // Route for updating the user's avatar (PATCH /):
// router.patch(
//   '/avatars',
//   authenticate,
//   uploadImage.single('avatar'),
//   controllers.updateUserAvatar
// );

//Створити приватний ендпоінт, який повертає поточну інформацію про користувача
// Route for getting the current user's information (GET /current):
router.get('/current', authenticate, controllers.getCurrentUser);

// Створити приватний ендпоінт логауту користувача
// Route for user logout (POST /logout):
router.post('/logout', authenticate, controllers.logoutUser);

module.exports = router;
