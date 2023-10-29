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

// Route for Google's auth URL (GET /google):
router
  .route('/google')
  .get(passport.authenticate('google', { scope: ['email', 'profile'] }));

// Route for Google's auth callback (GET /google/callback):
router
  .route('/google/callback')
  .get(
    passport.authenticate('google', { session: false }),
    controllers.googleAuth
  );

// Route for user registration (POST /register):
router
  .route('/register')
  .post(
    validateBody(userValidationSchemas.registerUserSchema),
    controllers.registerUser
  );

// Route for user login (POST /login):
router
  .route('/login')
  .post(
    validateBody(userValidationSchemas.loginUserSchema),
    controllers.loginUser
  );

// Route for getting the current user's information (GET /current):
router.route('/current').get(authenticate, controllers.getCurrentUser);

// Route for user logout (POST /logout):
router.route('/logout').post(authenticate, controllers.logoutUser);

router
  .route('/params')
  // Route for adding the user's params (POST /params):
  .post(
    authenticate,
    validateBody(userValidationSchemas.updateUserParamsSchema),
    controllers.updateUserParams
  )
  // Route for updating the user's params (PUT /params):
  .put(
    authenticate,
    validateBody(userValidationSchemas.updateUserParamsSchema),
    controllers.updateUserParams
  )
  // Route for getting the user's params (GET /params):
  .get(authenticate, controllers.getUserParams);

// Route for updating the user's name (PATCH /):
router
  .route('/username')
  .patch(
    authenticate,
    validateBody(userValidationSchemas.updateUserNameSchema),
    controllers.updateUserName
  );

// Route for updating the user's avatar (PATCH /):
router
  .route('/avatars')
  .patch(
    authenticate,
    uploadImage.single('avatar'),
    controllers.updateUserAvatar
  );

module.exports = router;
