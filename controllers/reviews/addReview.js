const { Review } = require('../../models');
const { controllerWrapper } = require('../../utils');

const addReview = controllerWrapper(async (req, res) => {
  const { _id: owner } = req.user;

  const review = await Review.create({ ...req.body, owner });

  res.status(201).json(review);
});

module.exports = addReview;
