const { Review } = require('../../models');
const { controllerWrapper, HttpError } = require('../../utils');

const updatePrivateReviewById = controllerWrapper(async (req, res) => {
  const { _id: owner } = req.user;
  const { id: _id } = req.params;

  const review = await Review.findOneAndUpdate(
    {
      _id,
      owner,
    },
    req.body,
    {
      new: true,
    }
  ).populate('owner', 'name avatarUrls');

  if (!review) {
    throw new HttpError(404);
  }

  res.status(200).json(review);
});

module.exports = updatePrivateReviewById;
