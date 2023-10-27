const { Schema, model } = require('mongoose');

const { handleMongooseError } = require('../utils');

/**
 * Schema for the Product model.
 */
const productSchema = new Schema(
  {
    product_ID: {
      type: String,
      required: [true, 'ID is required'],
    },
    date: {
      type: String,
      default: '',
      required: true,
    },
    amount: {
      type: Number,
      default: null,
      required: true,
    },
    calories: {
      type: Number,
      default: '',
      required: true,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'users',
      required: true,
    },
  },
  { versionKey: false }
);

// Handle Mongoose save errors using a post middleware
productSchema.post('save', handleMongooseError);

/**
 * Mongoose model for the 'product' collection using the userSchema.
 */
const Products = model('productDiary', productSchema);

module.exports = Products;
