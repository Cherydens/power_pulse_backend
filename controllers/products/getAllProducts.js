const Products = require('../../models/products');
const { controllerWrapper } = require('../../utils');

const getAllProducts = controllerWrapper(async (req, res) => {
  const { query = '' } = req.query;
  const blood = req.user.user.userParams.blood;

  const recommendedProducts = await Products.find({
    title: { $regex: query, $options: 'i' },
    [`groupBloodNotAllowed.${blood}`]: 'false',
  });

  const notRecommendedProducts = await Products.find({
    title: { $regex: query, $options: 'i' },
    [`groupBloodNotAllowed.${blood}`]: 'true',
  });

  const result = {
    recommended: recommendedProducts,
    notRecommended: notRecommendedProducts,
  };

  res.status(200).json(result);
});

module.exports = getAllProducts;
