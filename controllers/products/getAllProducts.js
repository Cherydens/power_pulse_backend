const Products = require('../../models/products');
const { controllerWrapper } = require('../../utils');

const getAllProducts = controllerWrapper(async (req, res) => {
  const { query = '', page = 1, limit = 18 } = req.query;
  const skip = (page - 1) * limit;

  const blood = req.user.user.userParams.blood;

  const recommendedProducts = await Products.find(
    {
      title: { $regex: query, $options: 'i' },
      [`groupBloodNotAllowed.${blood}`]: 'false',
    },
    {},
    { skip, limit }
  );

  const notRecommendedProducts = await Products.find(
    {
      title: { $regex: query, $options: 'i' },
      [`groupBloodNotAllowed.${blood}`]: 'true',
    },
    {},
    { skip, limit }
  );

  const result = {
    recommended: recommendedProducts,
    notRecommended: notRecommendedProducts,
  };

  res.status(200).json(result);
});

module.exports = getAllProducts;
