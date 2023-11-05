const getAllReviews = require('./getAllReviews');
const addReview = require('./addReview');
const getPrivateReviews = require('./getPrivateReviews');
const getReviewById = require('./getReviewById');
const getPrivateReviewById = require('./getPrivateReviewById');
const updatePrivateReviewById = require('./updatePrivateReviewById');
const removePrivateReviewById = require('./removePrivateReviewById')

module.exports = {
  getAllReviews,
  addReview,
  getPrivateReviews,
  getReviewById,
  getPrivateReviewById,
  updatePrivateReviewById,
  removePrivateReviewById,
};
