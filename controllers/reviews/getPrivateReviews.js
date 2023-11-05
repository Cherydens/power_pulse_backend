const { Review } = require('../../models');
const { controllerWrapper } = require('../../utils');

const getPrivateReviews = controllerWrapper(async (req, res) => {
  const { _id: owner } = req.user;

  const { page = 1, limit = 20, rating = null, description = null } = req.query;
  const skip = (page - 1) * limit;

  const baseQuery = { owner };

  rating && (baseQuery.rating = rating);

  description &&
    (baseQuery.description = { $regex: description.trim(), $options: 'i' });

  const reviews = await Review.find(baseQuery)
    .skip(skip)
    .limit(limit)
    .populate('owner', 'name avatarUrls');

  const total = await Review.countDocuments(baseQuery);

  res.status(200).json({ reviews, page: +page, limit: +limit, total });
});

module.exports = getPrivateReviews;
