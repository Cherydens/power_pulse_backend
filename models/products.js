const { Schema, model } = require('mongoose');

const { handleMongooseError } = require('../utils');

/**
 * Schema for the Product model.
 */
const productSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, 'title is required'],
    },
    caloriesValue: {
      type: String,
      default: null,
    },
    category: {
      type: String,
      required: [true, 'Category is required'],
      default: '',
    },
    quantity: {
      type: String,
      default: null,
    },
    dateOfuse: {
      type: String,
      default: '',
    },
  },
  { versionKey: false }
);

// Handle Mongoose save errors using a post middleware
productSchema.post('save', handleMongooseError);

/**
 * Mongoose model for the 'product' collection using the userSchema.
 */
const Products = model('product', productSchema);

module.exports = Products;
