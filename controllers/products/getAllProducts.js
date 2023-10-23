const Products = require('../../models/products');
const { controllerWrapper } = require('../../utils');

const getAllProducts = controllerWrapper(async (req, res) => {
  const {
    title = '',
    recommended,
    category = '',
    page = 1,
    limit = 18,
  } = req.query;
  const skip = (page - 1) * limit;

  const blood = req.user.user.userParams.blood;

  if (recommended) {
    switch (recommended) {
      case 'true':
        const recommendedProducts = await Products.find(
          {
            title: { $regex: title, $options: 'i' },
            category: { $regex: category, $options: 'i' },
            [`groupBloodNotAllowed.${blood}`]: 'false',
          },
          {},
          { skip, limit }
        );
        res.status(200).json(recommendedProducts);
        break;
      case 'false':
        const notRecommendedProducts = await Products.find(
          {
            title: { $regex: title, $options: 'i' },
            category: { $regex: category, $options: 'i' },
            [`groupBloodNotAllowed.${blood}`]: 'true',
          },
          {},
          { skip, limit }
        );
        res.status(200).json(notRecommendedProducts);
        break;
      default:
        break;
    }
  }

  const result = await Products.find(
    {
      title: { $regex: title, $options: 'i' },
      category: { $regex: category, $options: 'i' },
    },
    {},
    { skip, limit }
  );

  res.status(200).json(result);
});

module.exports = getAllProducts;
