const { Schema, model } = require('mongoose');

const { handleMongooseError } = require('../utils');

/**
 * Schema for the ProductsCategories model.
 */
const productsCategoriesSchema = new Schema(
  {
    productsCategories: {
      type: Array,
    },
  },
  { versionKey: false }
);

productsCategoriesSchema.post('save', handleMongooseError);

const ProductsCategories = model('productscategory', productsCategoriesSchema);

module.exports = ProductsCategories;
