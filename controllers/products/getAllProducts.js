const Products = require('../../models/products');
const { controllerWrapper, HttpError } = require('../../utils');

const getAllProducts = controllerWrapper(async (req, res) => {
  const {
    title = null,
    recommended = null,
    category = null,
    page = 1,
    limit = 18,
  } = req.query;
  const skip = (page - 1) * limit;

  const baseQuery = {};

  if (title) {
    baseQuery.title = { $regex: title.trim(), $options: 'i' };
  }

  if (category) {
    baseQuery.category = { $regex: category.trim(), $options: 'i' };
  }

  if (recommended) {
    const { userParams } = req.user;

    if (!userParams) {
      throw new HttpError(400, 'You must choose your user params');
    }

    baseQuery[`groupBloodNotAllowed.${userParams.blood}`] =
      recommended === 'true' ? 'false' : 'true';
  }

  const data = await Products.find(baseQuery).skip(skip).limit(limit);

  const total = await Products.countDocuments(baseQuery);

  res.status(200).json({ data, page: +page, limit: +limit, total });
});

module.exports = getAllProducts;
