const express = require('express');

const {
  validateBody,
  authenticate,
  uploadImage,
  passport,
} = require('../../middlewares');
const controllers = require('../../controllers/users');
const { userValidationSchemas } = require('../../utils');

const router = express.Router();

router.get(
  '/google',
  passport.authenticate('google', { scope: ['email', 'profile'] })
);

router.get(
  '/google/callback',
  passport.authenticate('google', { session: false }),
  controllers.googleAuth
);

// Routes for handling various user-related requests are added to this router. Here's their description:

// Route for user registration (POST /register):
router.post(
  '/register',
  validateBody(userValidationSchemas.registerUserSchema),
  controllers.registerUser
);

// Route for user login (POST /login):
router.post(
  '/login',
  validateBody(userValidationSchemas.loginUserSchema),
  controllers.loginUser
);

// Route for getting the current user's information (GET /current):
router.get('/current', authenticate, controllers.getCurrentUser);

// Route for user logout (POST /logout):
router.post('/logout', authenticate, controllers.logoutUser);

// Route for adding the user's params (POST /params):
router.post(
  '/params',
  authenticate,
  validateBody(userValidationSchemas.updateUserParamsSchema),
  controllers.updateUserParams
);

// Route for updating the user's params (PUT /params):
router.put(
  '/params',
  authenticate,
  validateBody(userValidationSchemas.updateUserParamsSchema),
  controllers.updateUserParams
);

// Route for getting the user's params (GET /params):
router.get('/params', authenticate, controllers.getUserParams);

// Route for updating the user's name (PATCH /):
router.patch(
  '/username',
  authenticate,
  validateBody(userValidationSchemas.updateUserNameSchema),
  controllers.updateUserName
);

// Route for updating the user's avatar (PATCH /):
router.patch(
  '/avatars',
  authenticate,
  uploadImage.single('avatar'),
  controllers.updateUserAvatar
);

module.exports = router;
