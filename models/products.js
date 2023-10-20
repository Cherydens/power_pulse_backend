const { Schema, model } = require('mongoose');

const { handleMongooseError } = require('../utils');

/**
 * Schema for the Products model.
 */
const productsSchema = new Schema(
  {
    title: {
      type: String,
    },
    category: {
      type: String,
    },
    weight: {
      type: Number,
    },
    calories: {
      type: Number,
    },
    groupBloodNotAllowed: {
      type: Object,
    },
  },
  { versionKey: false }
);

// Handle Mongoose save errors using a post middleware
productsSchema.post('save', handleMongooseError);

/**
 * Mongoose model for the 'products' collection using the userSchema.
 */
const Products = model('product', productsSchema);

module.exports = Products;
