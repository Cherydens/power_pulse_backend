const { Review } = require('../../models');
const { controllerWrapper, HttpError } = require('../../utils');

const getReviewById = controllerWrapper(async (req, res) => {
  const { id: _id } = req.params;

  const review = await Review.findById(_id).populate(
    'owner',
    'name avatarUrls'
  );

  if (!review) {
    throw new HttpError(404);
  }

  res.status(200).json(review);
});

module.exports = getReviewById;
