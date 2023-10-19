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

// Handle Mongoose save errors using a post middleware
productsCategoriesSchema.post('save', handleMongooseError);

/**
 * Mongoose model for the 'productscategories' collection using the userSchema.
 */
const ProductsCategories = model('productscategory', productsCategoriesSchema);

module.exports = ProductsCategories;
