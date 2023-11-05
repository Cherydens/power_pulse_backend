const express = require('express');

const { validateBody, authenticate, isValidId } = require('../../middlewares');

const controllers = require('../../controllers/reviews');

const { reviewValidationSchemas } = require('../../utils');

const router = express.Router();

// ************ PUBLIC ROUTES *******************

router.route('/public').get(controllers.getAllReviews);

router.route('/public/:id').get(isValidId, controllers.getReviewById);

// *********** PRIVATE ROUTES *******************

router
  .route('/private')
  .get(authenticate, controllers.getPrivateReviews)
  .post(
    authenticate,
    validateBody(reviewValidationSchemas.addReviewSchema),
    controllers.addReview
  );

router
  .route('/private/:id')
  .get(authenticate, isValidId, controllers.getPrivateReviewById)
  .patch(
    authenticate,
    isValidId,
    validateBody(reviewValidationSchemas.updateReviewSchema),
    controllers.updatePrivateReviewById
  )
  .delete(authenticate, isValidId, controllers.removePrivateReviewById);

module.exports = router;
