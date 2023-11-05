const { Review } = require('../../models');
const { controllerWrapper, HttpError } = require('../../utils');

const removePrivateReviewById = controllerWrapper(async (req, res) => {
  const { _id: owner } = req.user;
  const { id: _id } = req.params;

  const review = await Review.findOneAndRemove({
    _id,
    owner,
  }).populate('owner', 'name avatarUrls');

  if (!review) {
    throw new HttpError(404);
  }

  res.status(200).json(review);
});

module.exports = removePrivateReviewById;
